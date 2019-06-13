require('dotenv').config()
const {waterfall} = require('async')
const config = require('config')

const {
  EOF,

  getStats,
  incStats,
  readPage,
  setStats,
  writeFile,
} = require('./helpers')

const {finishIfAmountIs, finishEmpty} = require('./helpers/finishConditions')

function iteration1() {
  waterfall([setStats(1)], () => {
    console.log('INIT')
    process.exit(0)
  })
}

function iteration() {
  waterfall(
    [getStats, readPage, finishEmpty, writeFile, incStats],
    callback
  )
}

function callback(err, stats, data) {
  if (err) {
    if (err.err === 'finish') {
      console.log('EOD finish file signal')
      EOF(err => {
        if (err) throw err
        process.exit(0)
        console.log('FINISH!')
        return
      })

      return
    }
    throw new Error(err)
  }

  iteration()
}

iteration()
