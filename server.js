const express = require("express");
const app = express();
const server = require("http").Server(app);
const port = 3000;

app.use("/", express.static(__dirname));

server.listen(port, () => console.log(`Server listening on port ${port}!`));
