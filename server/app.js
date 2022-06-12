const cors = require('cors');
const express = require('express');
const app = express();

app.get('/', function (req, res) {
   res.send('Hello World');
});

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/public/', express.static('./public/'));

const server = app.listen(4765, function () {
   const host = server.address().address
   const port = server.address().port
   
   console.log("App listening at http://%s:%s", host, port)
})