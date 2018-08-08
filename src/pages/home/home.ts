import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Some char codes for result
  // Incorrect: &#x2717(✗); &#x2718(✘); Color: #f53d3d, #ff0000;
  // Correct: &#x2713(✓); &#x2714(✔); Color: #32db64, #00ff00;

  // Standard values
  checkMessage: String = "Input answer above & tap ==>";
  correctMessage: String = "That is correct!";
  incorrectMessage: String = "Correct Answer is: ";
  triggerCheck: String = "Check";
  triggerNext: String = "Next";
  minMult: number = 1;
  maxMult: number = 12;

  // Get reference to input field for setting focus
  @ViewChild('input') answerField;

  result: String = "";
  resultColor: String = "#000000";
  multiplicand: number = 11;
  multiplier: number = 12;
  response: any;
  message: String = "";
  triggerBtnLabel: String;
  iconName: String = "settings";

  constructor(public navCtrl: NavController) {
    this.message = this.checkMessage;
    this.triggerBtnLabel = this.triggerCheck;
  }

  ionViewDidLoad() {
    console.log("View Loaded!");
    setTimeout(() => {
      this.answerField.setFocus();
    }, 200);
  }

  // Open Settings page
  openModal() {
    console.log("OpenModal()");
  }

  resultSuccess() {
    this.result = "✔";
    this.resultColor = "#32db64";
  }

  resultFailure() {
    this.result = "✘";
    this.resultColor = "#f53d3d";
  }

  resultClear() {
    this.result = "";
    this.resultColor = "#000000";
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  checkAnswer(action) {
    console.log("Doing " + action + "...");
    console.log("It is" + this.answerField.readonly);
    if (action == this.triggerCheck) {
      var ans: number = this.multiplicand * this.multiplier;
      console.log("Answer checking: " +
        this.multiplicand + " x " + this.multiplier + " = " +
        ans + " vs " + this.response
      );
      this.answerField.readonly = true;
      if (this.response == ans) {
        console.log("Hurray! That's the right answer!");
        this.resultSuccess();
        this.message = this.correctMessage;
      } else {
        console.log("Alas! That's incorrect!");
        this.resultFailure();
        this.message = this.incorrectMessage + ans.toString();
      }
      this.triggerBtnLabel = this.triggerNext;
    } else {
      console.log("Preparing next question");
      this.resultClear();
      this.response = "";
      this.multiplicand = this.randomInt(this.minMult, this.maxMult);
      this.multiplier = this.randomInt(this.minMult, this.maxMult);
      this.triggerBtnLabel = this.triggerCheck;
      this.message = this.checkMessage;
      this.answerField.readonly = false;
      setTimeout(() => {
        this.answerField.setFocus();
      }, 200);
    }
  }
}
