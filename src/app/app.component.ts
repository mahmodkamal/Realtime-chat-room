import { SigninPage } from './../pages/signin/signin';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

const config =  {
   production: false,
  apiKey: "AIzaSyBYThMrbjOwXLTksqVd2zWKmwH86nfbydg",
  authDomain: "ionic-763e1.firebaseapp.com",
  databaseURL: "https://chatroomsc9032.firebaseio.com/",
  projectId: "ionic-763e1",
  storageBucket: "ionic-763e1.appspot.com",
  messagingSenderId: "543642243705"
};
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

