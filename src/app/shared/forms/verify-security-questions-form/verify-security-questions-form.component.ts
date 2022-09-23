import { Component, OnInit } from '@angular/core';
import { SelectedSecurityQuestion } from '../../interfaces/selected-security-question.interface';
import { VerifySecurityQuestionModel } from '../../interfaces/verify-security-question.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { SessionService } from '../../services/session.service';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-verify-security-questions-form',
  templateUrl: './verify-security-questions-form.component.html',
  styleUrls: ['./verify-security-questions-form.component.scss']
})
export class VerifySecurityQuestionsFormComponent implements OnInit {

  selectedSecurityQuestions: SelectedSecurityQuestion[];
  verifySecurityQuestionsModel: VerifySecurityQuestionModel;
  username: string;
  errorMessages: Message[];

  form: FormGroup = this.fb.group({
    answerToSecurityQuestion1: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion2: [null, Validators.compose([Validators.required])],
    answerToSecurityQuestion3: [null, Validators.compose([Validators.required])],
  });

  constructor(private route: ActivatedRoute, private router: Router, private fb: FormBuilder, private userService: UserService, private sessionService: SessionService) {
    this.username = this.route.snapshot.queryParamMap.get('username') ?? '';
    this.errorMessages = [];
    this.verifySecurityQuestionsModel = {} as VerifySecurityQuestionModel;
    this.selectedSecurityQuestions = [];

    this.userService.findSelectedSecurityQuestions(this.username).subscribe({
      next: (res) => {
        this.selectedSecurityQuestions = res.data;
        console.log(this.selectedSecurityQuestions);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.verifySecurityQuestionsModel.question1 = this.selectedSecurityQuestions[0].questionText;
        this.verifySecurityQuestionsModel.question2 = this.selectedSecurityQuestions[1].questionText;
        this.verifySecurityQuestionsModel.question3 = this.selectedSecurityQuestions[2].questionText;

        console.log('Verify security questions model');
        console.log(this.verifySecurityQuestionsModel);
      }
    })
  }

  ngOnInit(): void {
  }

  verifySecurityQuestions() {
    this.verifySecurityQuestionsModel.answerToQuestion1 = this.form.controls['answerToSecurityQuestion1'].value;
    this.verifySecurityQuestionsModel.answerToQuestion2 = this.form.controls['answerToSecurityQuestion2'].value;
    this.verifySecurityQuestionsModel.answerToQuestion3 = this.form.controls['answerToSecurityQuestion3'].value;

    console.log(this.verifySecurityQuestionsModel);

    this.sessionService.verifySecurityQuestions(this.verifySecurityQuestionsModel, this.username).subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.router.navigate(['/session/reset-password'], {queryParams: {isAuthenticated: 'true', username: this.username}, skipLocationChange: true});
        } else {
          this.errorMessages = [
            {severity: 'error', summary: 'Error', detail: 'Unable to verify security question answers'}
          ]
          console.log('Unable to verify security question answers');
        }
      },
      error: (e) => {
        console.log(e);
      }
    })
  }
}
