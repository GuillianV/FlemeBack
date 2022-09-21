var express = require('express');
var { authenticateToken, generateAccessToken} = require("../modules/jwt/jwt")
var router = express.Router();
require("dotenv").config()
let Recognized = require("../modules/database/mongoose/models/recognize")
//var axios = require("axios")

/* GET home page. */
router.get('/',  async function(req, res, next) {



  res.render('index', { title: 'Fleme' });


});


router.get('/:recognizeUrl',  async function(req, res, next) {


  let recognize = await Recognized.FindRecognizedByUrl(req.params.recognizeUrl)
  if(recognize == null){
    res.render('index', { title: 'Fleme' });
  }else{
    
 
    let text = ""
    for (let line of recognize.text.split("\n")) {
      text += line.replace(/"/g,"'") + "/!:/";
	
    }
    res.render('recognize', { text: text });

  }

});




module.exports = router;
