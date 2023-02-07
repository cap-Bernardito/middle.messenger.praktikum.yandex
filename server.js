const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("dist"));

app.get("/*", (req, res) => {
  // eslint-disable-next-line n/no-path-concat
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running  http://localhost:${PORT}`);
});
