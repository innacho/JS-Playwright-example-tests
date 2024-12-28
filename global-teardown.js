const { closePool } = require('./utils/db');

module.exports = async () => {
    await closePool();
};