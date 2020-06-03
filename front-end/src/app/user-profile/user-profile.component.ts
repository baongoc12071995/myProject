import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../shared/user.service';
import { SurveyListService } from '../shared/survey-list.service';
import { SurveyList } from '../shared/survey-list.model';
import { QuestionList } from '../shared/question-list.model';
import { QuestionListService } from '../shared/question-list.service';

declare var M: any;

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetails;
  isOpen: boolean;
  questionDetails;
  surveyItem;
  questionInSurveyList;

  constructor(private userService: UserService, private router: Router, private surveyListService: SurveyListService, private questionListService : QuestionListService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {}
    )
    this.refreshSurveyList();
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onSubmit(form: NgForm) {
    this.surveyListService.createNewSurveyItem(form.value).subscribe((res) => {
      console.log(res);
      M.toast({html: 'Saved successfully', classes: 'rounded'});
    })
  }

  refreshSurveyList() {
    this.surveyListService.getSurveyList().subscribe((res) => {
      this.surveyListService.surveyLists = res as SurveyList[];        
    })
  }

  onSurveyId(surveyList: SurveyList) {
    const questionIdArrayInSurvey = [];
    let questions;
    const questionIdArray = [];
    
    this.surveyItem = surveyList;
    console.log(surveyList);
    this.userDetails = !this.userDetails;
    
    this.surveyListService.getSurveyId(surveyList).subscribe(
      res => {
        this.questionDetails = res['questions'];
        this.questionDetails.forEach(ele => {
          questionIdArrayInSurvey.push(ele._id);
        });
      }
    );
    this.questionListService.getQuestionList().subscribe(
      res => {
        questions = res;        
        questions.forEach(ele => {
          let data = this.getQuestionById(questionIdArrayInSurvey, ele);
          if (data._id !== '') {
            questionIdArray.push(data);
          }
          return questionIdArray;
        });
      }
    );   
    this.questionInSurveyList = questionIdArray;
  }

  getQuestionById(idArr, questionId) {
    let result = {
      _id: '',
      questionText: ''
    };
    idArr.forEach(ele => {
      if (ele === questionId._id) {
        result._id = questionId._id;
        result.questionText = questionId.questionText;
      }
    });
    return result;
  }
}
