const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/public`));
const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.info(`Fwitter backend listening at http://localhost:${port}`);
});
