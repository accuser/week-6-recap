const app = require("./app");

const HOST = process.env["HOST"] || "localhost";
const PORT = process.env["PORT"] || 5001;

app.listen(PORT, HOST, () => {
  console.log(`app listening on http://${HOST}:${PORT}`);
});
