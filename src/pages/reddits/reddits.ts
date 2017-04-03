import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RedditService } from '../../app/services/reddit.service';
import { DetailsPage } from '../details/details';

/*
  Generated class for the Reddits page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {

  items: any;
  category: any;
  limit: any;
  sort: any;
  page: any;
  before: any;
  after: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private redditService: RedditService) {
    this.getDefaults();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedditsPage');
    this.getPosts(this.category, this.limit, this.sort, null, null);
  }

  getPosts(category, limit, sort, before, after) {
    this.redditService.getPosts(category, limit, sort, before, after).subscribe(response => {
      this.items = response.data.children;
      this.before = response.data.children[0].kind +"_"+ response.data.children[0].data.id;
      this.after = response.data.children[response.data.children.length-1].kind + "_"+response.data.children[response.data.children.length-1].data.id;
    })
  }

  viewItem(item) {
    this.navCtrl.push(DetailsPage, {item:item});
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
    this.page = 1;
  }

  changeCategory() {
    this.getPosts(this.category, this.limit, this.sort, null, null);
  }

  nextPage() {
    this.getPosts(this.category, this.limit, this.sort, null, this.after);
  }

  previousPage() {
    this.getPosts(this.category, this.limit, this.sort, this.before, null);
  }
}
