const {waterfall} = require('async')
const redis = require('redis')
const {print} = require('./helpers')

const CURRENT_PAGE = 'currentPage'

const client = redis.createClient()
client.select(312, function() {
  console.log('base 312') /* ... */
})

function maybeSet(data, cb) {
  if (!data) {
    return client.set(CURRENT_PAGE, 1, (err, data) => {
      cb(err, 1)
    })
  }
  return cb(null, data)
}

function getFromRedis(...args) {
  // cb is last param
  const cb = args.length > 0 && args[args.length - 1]
  client.get(CURRENT_PAGE, cb)
}

function incStats(stats, data, cb) {
  const {currentPage: oldCurrentPage} = stats
  const currentPage = oldCurrentPage + 1
  client.set(CURRENT_PAGE, currentPage, (err, _) => {
    if (err) {
      return cb(err)
    }
    const newStats = {...stats, currentPage}
    console.log(print(newStats))
    return cb(null, newStats, data)
  })
}

function setStats(value /*: number */) {
  return (...args) => {
    const cb = args.length > 0 && args[args.length - 1]
    client.set(CURRENT_PAGE, value, cb)
  }
}

/*
interface Stats = {
  currentPage: number,
}
*/

const getStats = (...args) => {
  // cb is last param
  const cb = args.length > 0 && args[args.length - 1]
  waterfall([getFromRedis, maybeSet], commonCallback)
  function commonCallback(err, currentPage) {
    const result = {
      currentPage: parseInt(currentPage, 10),
    }

    console.log(JSON.stringify(result, null, 2))

    return cb(err, result)
  }
}

module.exports = {incStats, getStats, setStats, print}
