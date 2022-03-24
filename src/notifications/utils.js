const path = require('path');
const fs = require('fs').promises;
const ejs = require('ejs');

/**
 * Is the view text refer to a view file.
 *
 * @param {string} view View text.
 *
 * @return {boolean} View text is view file.
 */
const isViewFile = (view) => view && view.endsWith('.ejs');

/**
 * Is the view file exists.
 *
 * @param {string} viewPath View file path.
 *
 * @return {boolean} View file exists.
 */
const isViewExists = async (viewPath) => {
  try {
    await fs.access(path.join(__dirname, `/views/`, viewPath));
    return true;
  } catch (err) {
    return false;
  }
};

/**
 * Render view.
 *
 * @param {string} view The view file path or text.
 * @param {Object} content The view content data.
 *
 * @return {Promise<string>} The rendered view text.
 */
const renderView = async (view, content) => {
  if (!view) {
    return null;
  }

  const text = isViewFile(view)
    ? await ejs.renderFile(path.join(__dirname, `/views/`, view), content)
    : await ejs.render(view, content);

  return text;
};

/**
 * Parse notification channel content.
 *
 * @param {Object} content The notification channel data.
 *
 * @return {Object} The parsed content.
 */
const parseContent = (content) =>
  Object.keys(content).reduce((acc, key) => {
    acc[key] = { model: content[key].model, fields: content[key].fields };
    return acc;
  }, {});

module.exports = {
  isViewFile,
  renderView,
  isViewExists,
  parseContent,
};
