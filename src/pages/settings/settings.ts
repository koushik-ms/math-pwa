import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { MyApp } from '../../app/app.component';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})

export class SettingsPage {
  data: any = {};
  signedIn: boolean = false;
  score: number;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private zone: NgZone
  ) {
    this.data = navParams.get('context');
    if (this.data != null) {
      if (this.data.user != null) {
        this.signedIn = true;
      }
      if (this.data.score != null) {
        this.score = Math.round(this.data.score * 100) / 100;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage with score: ' + this.data.score);
    for (let [key, value] of this.data.scores) {
      console.log(key, value);
    }
    console.log("Ob: " + this.data.scores[11]);
  }

  viewDetails() {
    console.log("View Score Details");
  }

  signIn() {
    let provider = new MyApp.fb.auth.GoogleAuthProvider();
    MyApp.fb.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      this.data.accessToken = result.credential.accessToken;
      // The signed-in user info.
      this.data.user = result.user;
      // Cache result for later processing
      this.data.authResult = result;
      this.zone.run(() => {
        this.signedIn = true;
      });
      console.log("Auth SUCCESS: User " + this.data.user + " token " + this.data.accessToken);
      console.log("Result is" + JSON.stringify(this.data));
    }).catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // The email of the user's account used.
      // let email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // let credential = error.credential;
      // ...
      console.log("Auth Error: " + errorCode + ", " + errorMessage);
      this.data.authResult = null;
      this.data.user = null;
      this.data.accessToken = null;
      this.zone.run(() => {
        this.signedIn = true;
      });
    });
  }
  signOut() {
    // Sign-out current user
    if (this.data.user != null) {
      // MyApp.fb.auth().signOut().then(() => {
      //   // Sign-out successful.
      // }).catch((error) => {
      //   // An error happened.
      //   console.log("Signout error!");
      // });
      this.data.authResult = null;
      this.data.user = null;
      this.data.accessToken = null;
      this.zone.run(() => {
        this.signedIn = true;
      });
    }
  }
}

