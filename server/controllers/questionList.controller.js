const mongoose = require('mongoose');

const QuestionList = mongoose.model('QuestionList');

var ObjectId = require('mongoose').Types.ObjectId;

//Create questions for questions array in survey item.
module.exports.createNewQuestion = (req, res) => {
    var questionList = new QuestionList();
    questionList.questionText = req.body.questionText;
    questionList.save((err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('Error in Question save: ' + JSON.stringify(err, undefined, 2));
        }
    });
    console.log('Create new question successfully.');
}

module.exports.questionListing = (req, res) => {
    console.log("get list question");
    QuestionList.find((err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('Error in retrieving question: ' + JSON.stringify(err, undefined, 2));
        }
    })
}

module.exports.getQuestionById = (req, res) => {
    if (!ObjectId.isValid(req.params.questionId)) {
        console.log('I am here');
        return res.status(400).send(`No records with given id: ${req.params.questionId}`);
    }
    QuestionList.findById(req.params.questionId, (err, doc) => {
        if (!err) {
            res.send(doc);
            console.log(doc);
        } else {
            console.log('Error in getting question: ' + JSON.stringify(err, undefined, 2));
        }
    })
}