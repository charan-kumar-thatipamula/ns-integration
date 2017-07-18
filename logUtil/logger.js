function log (msg1, msg2, logLevel) {
  if (!configuration.enableLog) {
    return
  }
  if (!logLevel) {
    logLevel = 'DEBUG'
  }
  msg1 = msg1 || ''
  msg2 = msg2 || ''
  nlapiLogExecution(logLevel, msg1, msg2)
}

if (typeof module.exports !== 'undefined' && module.exports) {
  module.exports = log
}