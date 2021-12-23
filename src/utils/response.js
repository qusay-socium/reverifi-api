/**
 * Get response object.
 *
 * @param {Object} data Response data.
 * @param {number} code Response status code.
 * @param {string} message Response message.
 *
 * @return {Object} Response object.
 */
module.exports = (data, code = 200, message = 'Ok') => {
  const res = { code, message };
  if (data) {
    res.data = data;
  }
  return res;
};
