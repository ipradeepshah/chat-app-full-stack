const express = require('express');
const app = express();
const port = 3000;
const UserRouter = require('./routes/user');
const dbConnect = require('./db/connection');


app.use(express.json());

dbConnect();
app.use( UserRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
