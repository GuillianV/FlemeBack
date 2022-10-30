var express = require('express');
var { authenticateToken, generateAccessToken} = require("../modules/jwt/jwt")
var router = express.Router();
require("dotenv").config()
let Recognized = require("../modules/database/mongoose/models/recognize");
const { json } = require('express');
//var axios = require("axios")

/* GET home page. */
router.get('/',  async function(req, res, next) {

  res.json([])


});

router.post('/',  async function(req, res, next) {


    let data = typeof req.query.data !== 'undefined' && typeof req.query.data == 'string' ? req.query.data : null;
    if(data == null){
      res.json({error: "No data"})
    }
    
    try {
      data = JSON.parse(data);
      console.log(data)
    } catch (e) {
      res.json({error: "Data contains invalid value"})
    }

    console.log(data)
    let recognize = await Recognized.CreateRecognized(data)
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
