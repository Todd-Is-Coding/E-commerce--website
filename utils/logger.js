function log(level, message, meta) {
  const payload = {
    level,
    message,
    ...(meta && Object.keys(meta).length ? { meta } : {}),
    pid: process.pid,
    timestamp: new Date().toISOString(),
  };

  console.log(JSON.stringify(payload));
}

module.exports = {
  info(message, meta = undefined) {
    log("info", message, meta);
  },
  warn(message, meta = undefined) {
    log("warn", message, meta);
  },
  error(message, meta = undefined) {
    log("error", message, meta);
  },
  fatal(message, meta = undefined) {
    log("fatal", message, meta);
  },
};
