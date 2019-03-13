const he = require('he');

const parseLocationInput = str => {
  if (typeof str !== 'string') {
    const noSpaceStr = JSON.stringify(str).replace(/\s+/g, '');
    const validHtml = he.encode(noSpaceStr, { strict: true });
    return validHtml;
  }
  const noSpaceStr = str.replace(/\s+/g, '');
  const validHtml = he.encode(noSpaceStr, { strict: true });
  return validHtml;
};

module.exports = {
  parseLocationInput,
};
