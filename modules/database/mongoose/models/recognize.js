let mongoose = require("../mongooseInit")
var sanitize = require('mongo-sanitize');
let TextBlock = require("./textBlock")
let { randomPrefix, fullSanitize} = require("../../utils")

//Schema
const RecognizedSchema = new mongoose.Schema({
    url: String,
    fullText : String,
    textBlocks : [TextBlock.schema],
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

        
        let textBlocks = typeof data.recognizerBlocks !== 'undefined' ? data.recognizerBlocks : [];
        let textBlocksCreated = [];
        for(textBlock of textBlocks){
            textBlocksCreated.push(new TextBlock({ id: textBlock.id, text: fullSanitize( textBlock.text)}));
        }
        let newRecognized = new Recognized({fullText:fullSanitize(data.fullText), creation: Date.now(), url:urlGenerated, textBlocks:textBlocksCreated});
        await newRecognized.save()
        return newRecognized;

    } else {
        return Recognized.CreateRecognized(data);
    }

}


module.exports = Recognized;

