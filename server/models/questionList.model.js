const mongoose = require('mongoose');

var questionListSchema = new mongoose.Schema({
    questionText: String
})

mongoose.model('QuestionList', questionListSchema);