const Router = require('express-promise-router');
const Multer = require('multer');
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

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

const router = Router({ mergeParams: true });

/**
 * Handle POST to /api/upload/image route.
 */
router.post('/image', [auth, multer.single('file')], (req, res, next) => {
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

module.exports = router;
