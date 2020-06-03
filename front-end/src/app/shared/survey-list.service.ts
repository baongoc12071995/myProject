import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { SurveyList } from './survey-list.model';

@Injectable({
  providedIn: 'root'
})
export class SurveyListService {
  selectedSurveyItem: SurveyList;
  surveyLists: SurveyList[];

  constructor(private http: HttpClient) { }

  createNewSurveyItem(surveyList: SurveyList) {    
    return this.http.post(environment.apiBaseUrl + '/surveys/createNewSurveyItem', surveyList);
  }

  getSurveyList() {
    return this.http.get(environment.apiBaseUrl + '/surveyListing');
  }

  getSurveyId(surveyList: SurveyList) {
    return this.http.get(environment.apiBaseUrl + `/surveys/${surveyList._id}`);
  }
}
