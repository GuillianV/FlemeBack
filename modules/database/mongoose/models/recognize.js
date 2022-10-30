let mongoose = require("../mongooseInit")
var sanitize = require('mongo-sanitize');
let { randomPrefix} = require("../../utils")

//Schema
const RecognizedSchema = new mongoose.Schema({
    url: String,
    fullText : String,
    creation : Date
});

//Schema methods
RecognizedSchema.methods.GetCreation = function () {
    const creationAwnser = `this text was created at ${this.creation}`;
    console.log(creationAwnser);
};

RecognizedSchema.methods.UpdateText = async function (_text) {
    this.fullText = _text;
    await this.save()
};

//Create Model
const Recognized = mongoose.model('Recognized', RecognizedSchema);


//Add Queries
Recognized.FindRecognizedById = async (id) => {
    let RecognizedData =await Recognized.findOne({_id:sanitize(id)});
    return RecognizedData

}

Recognized.FindRecognizedByUrl = async (url) => {
    let RecognizedData =await Recognized.findOne({url:sanitize(url)});
    return RecognizedData

}

Recognized.CreateRecognized = async (data) => {

    let urlGenerated = randomPrefix("xxxxx")

    let searchRecognized =  await Recognized.findOne({url:urlGenerated}).catch(error => {
        console.log(error)
        return null
    });

    if (searchRecognized == null){

        let newRecognized = new Recognized({fullText:sanitize(data.fullText), creation: Date.now(), url:urlGenerated});
        await newRecognized.save()
        return newRecognized;

    } else {
        return Recognized.CreateRecognized(data);
    }

}


module.exports = Recognized;

