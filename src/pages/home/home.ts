import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // Some char codes for result
  // Incorrect: &#x2717(✗); &#x2718(✘); Color: #f53d3d, #ff0000;
  // Correct: &#x2713(✓); &#x2714(✔); Color: #32db64, #00ff00;
  result: String = "";
  resultColor: String = "";
  multiplicand: number = 11;
  multiplier: number = 12;
  response: number = 0;
  responseStr: String = "???";
  constructor(public navCtrl: NavController) {
  }

  resultSuccess() {
    this.result = "✔";
    this.resultColor = "#32db64";
  }

  resultFailure() {
    this.result = "✘";
    this.resultColor = "#f53d3d";
  }
}
