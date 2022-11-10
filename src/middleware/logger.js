const logger = (req, res, next) => {
  const { method, path } = req;

  console.log(`> ${method} ${path}`);

  res.on("finish", () => {
    const { statusCode, statusMessage } = res;

    console.log(`< ${statusCode} ${statusMessage}`);
  });

  next();
};

module.exports = logger;
