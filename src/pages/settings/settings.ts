import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditsPage } from '../reddits/reddits';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  category: any;
  limit: any;
  sort: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getDefaults();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  getDefaults() {
    if(localStorage.getItem('category') != null) {
      this.category = localStorage.getItem('category');
      this.limit = localStorage.getItem('limit');
      this.sort = localStorage.getItem('sort');
    }
    else {
      this.category = "The_Donald";
      this.limit = 10;
      this.sort = "hot";
    }
  }

  setDefaults() {
    localStorage.setItem('category', this.category);
    localStorage.setItem('limit', this.limit);
    localStorage.setItem('sort', this.sort);
    this.navCtrl.push(RedditsPage);
  }

}
