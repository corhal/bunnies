'use strict';

var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.resolve(__dirname, '../client/')));

app.listen(
  3000,
  function staticServerStarted() {
    console.log('Static server is running on http://127.0.0.1:3000');
  }
);
