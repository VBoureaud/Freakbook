const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const { User } = require('./models');

// parse json request body
app.use(express.json({ limit: '10mb' }));

// parse urlencoded request body
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// enable cors
app.use(cors());
app.options('*', cors());

app.use('/public/', express.static('./public/'));

app.get('/', function (req, res) {
   res.send('Hello World');
});

app.get('/user/:id', async (req, res) => {
   const id = req.params.id;
   
   const user = await User.find({ name: id });
   if (!user || !user.length)
      return res.send({ msg: 'Nothing yet.' });
   
   return res.send(user[0]);
});

app.post('/user', async (req, res) => {
   const body = req.body;
   if (!body.name || !body.data)
      return res.send({ msg: 'Invalid data.'});

   const user = await User.find({ name: body.name });
   if (user.length)
      return res.send({ msg: 'User already created.' });

   const userDoc = await User.create({
      name: body.name,
      data: body.data,
   });

   res.send({ user: userDoc });
});

module.exports = app;
