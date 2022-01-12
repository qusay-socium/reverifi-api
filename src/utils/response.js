/**
 * Get response object.
 *
 * @param  {Object} [response={}] Response object.
 * @param  {number} [response.code=200] Response code.
 * @param  {string} [response.message='Ok'] Response message.
 *
 * @return {Object} Response object.
 */
module.exports = ({ code = 200, message = 'Ok', ...args } = {}) => ({ code, message, ...args });
