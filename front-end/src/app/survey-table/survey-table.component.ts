import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { SurveyListService } from '../shared/survey-list.service';

@Component({
  selector: 'app-survey-table',
  templateUrl: './survey-table.component.html',
  styleUrls: ['./survey-table.component.css']
})
export class SurveyTableComponent implements OnInit {

  constructor(private surveyListService: SurveyListService) { }

  ngOnInit() {
    this.surveyListService.selectedSurveyItem = {
      _id: "",
      questions: [],
      description: {},
      startDate: "",
      endDate: "",
      isOpen: null
    }
  }

}
