import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { QuestionList } from './question-list.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionListService {

  constructor(private http: HttpClient) {}

  createNewQuestion(questionList: QuestionList) {
    return this.http.post(environment.apiBaseUrl + '/questions/createNewQuestion', questionList);
  }

  getQuestionList() {
    return this.http.get(environment.apiBaseUrl + '/questionListing');
  }

  getQuestionId(questionList: QuestionList) {    
    return this.http.get(environment.apiBaseUrl + `/questions/${questionList._id}`);
  }
}
