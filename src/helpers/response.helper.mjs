const getUpdatedEntity = response => {
  if (!response || !Array.isArray(response)) {
    return undefined;
  }
  if (response.length < 2) {
    return undefined;
  }
  if (!Array.isArray(response[1])) {
    return undefined;
  }
  if (response[1].length < 1) {
    return undefined;
  }
  const [, [dataValues]] = response;
  return dataValues;
};

module.exports = { getUpdatedEntity };
