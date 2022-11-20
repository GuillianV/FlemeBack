var express = require('express');
var router = express.Router();

router.get('/',  function(req, res, next) {

  res.render('cgu', { title: "Conditions générales d'utilisations" });


});

module.exports = router;
