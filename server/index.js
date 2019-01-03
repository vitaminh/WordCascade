const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

// static file-serving middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'));
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
