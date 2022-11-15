require('dotenv').config();
const express = require('express');
const router = require('./routers');
const app = express();
var cors = require('cors')
const port = process.env.PORT || 3000;  // port is now available to the Node.js runtime as if it were an environment variable

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});  // app.listen() returns a http.Server object


app.use('/', router);


