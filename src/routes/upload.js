const Router = require('express-promise-router');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const response = require('utils/response');
const { BadRequest } = require('lib/errors');
const auth = require('middleware/auth');
const {
  GCLOUD_STORAGE_BUCKET,
  GOOGLE_APPLICATION_CREDENTIALS,
  GCLOUD_PROJECT,
} = require('../config/config');

const storageClient = new Storage({
  projectId: GCLOUD_PROJECT,
  keyFilename: GOOGLE_APPLICATION_CREDENTIALS,
});

const bucket = storageClient.bucket(GCLOUD_STORAGE_BUCKET);

const mul = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 2 * 1024 * 1024, // 2mb
  },
});

const multipleFilesLimit = 10;

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/upload/file route.
 */
router.post('/file', [auth, mul.single('file')], (req, res, next) => {
  if (!req.file) {
    throw new BadRequest('No file uploaded');
  }

  // Create a new blob in the bucket and upload the file data.
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();
  blobStream.on('error', (err) => {
    next(err);
  });
  blobStream.on('finish', () => {
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

    res.json(response({ publicUrl }));
  });

  blobStream.end(req.file.buffer);
});

/**
 * Handle POST to /api/upload/multiple-files route.
 */
router.post('/multiple-files', [mul.array('files[]', multipleFilesLimit)], (req, res, next) => {
  if (!req.files.length) {
    throw new BadRequest('No files uploaded');
  }

  let count = 0;
  const publicUrls = [];

  req.files.forEach((file, index, array) => {
    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', (err) => {
      next(err);
    });
    blobStream.on('finish', () => {
      count += 1;
      publicUrls.push(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

      if (count >= array.length) {
        res.json(response({ publicUrls }));
      }
    });
    blobStream.end(file.buffer);
  });
});

module.exports = router;
