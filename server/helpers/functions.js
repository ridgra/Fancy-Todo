function getYesterday() {
  const date = new Date();
  return new Date(date.setDate(date.getDate() - 1)).toISOString();
}

module.exports = { getYesterday };
