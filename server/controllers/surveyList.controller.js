const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const SurveyList = mongoose.model('SurveyList');

var ObjectId = require('mongoose').Types.ObjectId;

//create a new survey for showing survey lists
module.exports.createNewSurveyItem = (req, res, next) => {
    var surveyList = new SurveyList();
    surveyList.questions = req.body.questions;
    surveyList.description = req.body.description;
    surveyList.startDate = req.body.startDate;
    surveyList.endDate = req.body.endDate;
    surveyList.isOpen = req.body.isOpen;
    surveyList.save((err, doc) => {
        if (!err) { res.send(doc); } else {
            if (err) {
                res.status(422).send(['Cannot create new survey.']);
            } else return next(err);
        }
    });
    console.log('Create new survey successfully.');
}

module.exports.surveyListing = (req, res) => {
    SurveyList.find((err, docs) => {
        if (!err) { res.send(docs); } else {
            console.log('Error in retrieving survey: ' + JSON.stringify(err, undefined, 2));
        }
    })
}

module.exports.getSurveyId = (req, res) => {
    if (!ObjectId.isValid(req.params.surveyId))
        return res.status(400).send(`No records with given id: ${req.params.surveyId}`);
    SurveyList.findById(req.params.surveyId, (err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            console.log('Error in getting Survey: ' + JSON.stringify(err, undefined, 2));
        }
    })
}

module.exports.editSurveyId = (req, res) => {
    if (!ObjectId.isValid(req.params.surveyId))
        return res.status(400).send(`No records with given id: ${req.params.surveyId}`);
    var surveyItem = {
        questions: req.body.questions,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        isOpen: req.body.isOpen
    }
    SurveyList.update({
        'questions._id': req.body.mainId,
        'description._id': req.body.subId
    }, { $set: surveyItem }, { new: true }, (err, doc) => {
        if (!err)
            res.send(doc);
        else {
            console.log('Error in Survey update: ' + JSON.stringify(err, undefined, 2));
        }
    })
}

module.exports.deleteSurveyId = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records with given id: ${req.params.id}`);
    SurveyList.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('Error in Survey delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
}