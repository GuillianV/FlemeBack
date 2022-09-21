var express = require('express');
var { authenticateToken, generateAccessToken} = require("../modules/jwt/jwt")
var router = express.Router();
require("dotenv").config()
let Recognized = require("../modules/database/mongoose/models/recognize")
//var axios = require("axios")

/* GET home page. */
router.get('/',  async function(req, res, next) {

  res.json([])


});

router.post('/',  async function(req, res, next) {

    let text = typeof req.query.text !== 'undefined' ? req.query.text : null;
    if(text == null){
      res.json({error: "No text"})
    }
    text.replace("\"","'");
    let recognize = await Recognized.CreateRecognized(text)
    res.json(recognize)
});


router.get('/:recognizeUrl',  async function(req, res, next) {

  let recognize = await Recognized.FindRecognizedByUrl(req.params.recognizeUrl)

  if(recognize == null){
    res.json({})
  }else{
    
    res.json(recognize)
  }

});




module.exports = router;
