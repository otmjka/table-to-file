const {sequelizeUN} = require('./sequelizeUN')
const {incStats, getStats, setStats} = require('./getStats')
const {readPage} = require('./readPage')
const {EOF, writeFile} = require('./writeFile')

module.exports = {
  EOF,

  getStats,
  incStats,
  readPage,
  setStats,
  sequelizeUN,
  writeFile,
}
