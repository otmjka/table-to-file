const FINISH_SIGNAL = {err: 'finish'}

function finishIfAmountIs(amount) {
  return (stats, data, cb) => {
    const {currentPage} = stats
    if (currentPage >= amount) {
      console.log(`FINISH: more than ${amount}!`)
      return cb(FINISH_SIGNAL)
    }
    return cb(null, stats, data)
  }
}

function finishEmpty(stats, data, cb) {
  if (data.length === 0) {
    console.log('finish, length is 0')
    return cb(FINISH_SIGNAL)
  }
  return cb(null, stats, data)
}

module.exports = {
  finishIfAmountIs,
  finishEmpty,
}
