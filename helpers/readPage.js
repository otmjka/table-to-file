const {sequelizeUN} = require('./sequelizeUN')

const LIMIT = 50

function readPage(stats, cb) {
  const sku = sequelizeUN.models.sku
  const limit = LIMIT
  const offset = stats.currentPage * limit
  sku
    .findAll({offset, limit})
    .then(data => {
      return cb(null, stats, data)
    })
    .catch(cb)
}

module.exports = {readPage}
