module.exports = date =>
  date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");
