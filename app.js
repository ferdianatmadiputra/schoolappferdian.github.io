const express = require('express');
// const router = require('./router/home.js');
const index = require('./router/index.js')

const app = express();
const port = 3000;


app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}));

app.use('/', index);

app.listen(port, () => {
    console.log('this app is running on port: ', port);
});
