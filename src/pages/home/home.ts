import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  // Some char codes for result
  // Incorrect: &#x2717(✗); &#x2718(✘); Color: #f53d3d, #ff0000;
  // Correct: &#x2713(✓); &#x2714(✔); Color: #32db64, #00ff00;

  // Standard values
  private static readonly checkMessage: String = "Input answer above & tap ==>";
  private static readonly correctMessage: String = "That is correct!";
  private static readonly incorrectMessage: String = "Correct Answer is: ";
  private static readonly triggerCheck: String = "Check";
  private static readonly triggerNext: String = "Next";
  private static readonly minMult: number = 1;
  private static readonly maxMult: number = 12;

  // Get reference to input field for setting focus
  @ViewChild('input') answerField;

  result: String = "";
  resultColor: String = "#000000";
  multiplicand: number;
  multiplier: number;
  response: any;
  message: String = "";
  triggerBtnLabel: String;
  iconName: String = "settings";
  scoreIncrement: number;
  // Application state
  appCtxt: any = {};

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {
    this.multiplicand = this.randomInt(HomePage.minMult, HomePage.maxMult);
    this.multiplier = this.randomInt(HomePage.minMult, HomePage.maxMult);
    this.message = HomePage.checkMessage;
    this.triggerBtnLabel = HomePage.triggerCheck;
    this.scoreIncrement = 0.01 / (HomePage.maxMult - HomePage.minMult);
    this.appCtxt.score = 0;
    this.appCtxt.scores = [];
    let i = HomePage.minMult;
    for (; i <= HomePage.maxMult; i++) {
      this.appCtxt.scores[i - HomePage.minMult] = [i, 0];
    }
  }

  ionViewDidLoad() {
    console.log("View Loaded! ");
    setTimeout(() => {
      this.answerField.setFocus();
    }, 200);
  }

  // Open Settings page
  openModal() {
    console.log("OpenModal()");
    let modal = this.modalCtrl.create(SettingsPage, { 'context': this.appCtxt });
    modal.onDidDismiss((data) => {
      console.log("Modal returned: " + data);
    });
    modal.present();
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
    if (action == HomePage.triggerCheck) {
      var ans: number = this.multiplicand * this.multiplier;
      console.log("Answer checking: " +
        this.multiplicand + " x " + this.multiplier + " = " +
        ans + " vs " + this.response
      );
      this.answerField.readonly = true;
      if (this.response == ans) {
        console.log("Hurray! That's the right answer!");
        this.resultSuccess();
        this.message = HomePage.correctMessage;
        let datum = this.appCtxt.scores[this.multiplicand - HomePage.minMult];
        datum[1] = Math.min(100, datum[1] + 1);
        this.appCtxt.scores[this.multiplicand - HomePage.minMult] = datum;
        this.appCtxt.score = Math.min(100, this.appCtxt.score + this.scoreIncrement);
      } else {
        console.log("Alas! That's incorrect!");
        this.resultFailure();
        this.message = HomePage.incorrectMessage + ans.toString();
        let datum = this.appCtxt.scores[this.multiplicand - HomePage.minMult];
        datum[1] = Math.max(0, datum[1] - .5);
        this.appCtxt.scores[this.multiplicand - HomePage.minMult] = datum;
        this.appCtxt.score = Math.max(0, this.appCtxt.score - 0.5 * this.scoreIncrement);
      }
      this.triggerBtnLabel = HomePage.triggerNext;
    } else {
      console.log("Preparing next question");
      this.resultClear();
      this.response = "";
      this.multiplicand = this.randomInt(HomePage.minMult, HomePage.maxMult);
      this.multiplier = this.randomInt(HomePage.minMult, HomePage.maxMult);
      this.triggerBtnLabel = HomePage.triggerCheck;
      this.message = HomePage.checkMessage;
      this.answerField.readonly = false;
      setTimeout(() => {
        this.answerField.setFocus();
      }, 200);
    }
  }
}
