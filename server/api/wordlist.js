const router = require('express').Router();
const wordlist = require('wordlist-english');

router.get('/', (req, res, next) => {
  res.json(wordlist['english/35']);
});

module.exports = router;
