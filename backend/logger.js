const errLogger = (location, msg) => {
  console.error(`An error occured in ${location}:`, msg)
}

const warnLogger = (location, msg) => {
  console.warn(`A warning occured in ${location}:`, msg)
}

const sendErrorResponse = (type, res, location, msg, err) => {
  switch(type) {
    case type === 'WARN':
      warnLogger(location, err)
      res.status(500).send({ERR: msg});
    case type === 'ERROR':
      errLogger(location, err)
      res.status(500).send({ERR: msg});
    default:
      warnLogger(location, err)
      res.status(500).send({ERR: msg})
  }
}

module.exports = sendErrorResponse
