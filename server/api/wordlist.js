const router = require('express').Router();
const wordlist = require('wordlist-english');

router.get('/', (req, res, next) => {
  res.json(wordlist.english.slice(0, 10));
});

module.exports = router;
