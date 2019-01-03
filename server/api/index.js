const router = require('express').Router();

router.use('/wordlist', require('./wordlist'));

module.exports = router;
