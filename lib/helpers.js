const COLORS = {
  reset: '\x1b[0m',
  blackFg: '\x1b[30m',
  whiteFg: '\x1b[37m',
  blackBg: '\x1b[40m',
  whiteBg: '\x1b[47m'
}

const clone = (obj) => JSON.parse(JSON.stringify(obj))

module.exports = {
  clone,
  COLORS,
  hasOwnProperty,
  uuid,
  log,
}


function hasOwnProperty(obj, property) {
  return Object.prototype.hasOwnProperty.call(obj, property)
}

// thanks: https://stackoverflow.com/a/44078785/4151489
function uuid(){
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}

function log(...args) {
  console.log('[server]', ...args)
}
