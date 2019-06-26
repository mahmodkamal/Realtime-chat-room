import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
/**
 * Generated class for the UsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-users',
  templateUrl: 'users.html',
})
export class UsersPage {
users = []
chats 
Key
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.chats= this.navParams.get('users');
    this.Key = this.navParams.get('key');
    this.users = snapshotToArray(this.chats);
    console.log(this.users);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsersPage');
  }
  deleteUser(key)
  {
    console.log(key);
    var room = firebase.database().ref('chatrooms/'+this.Key+'/chats'+key)
    room.remove()
    .then(()=>{
      console.log('User deleted');
    })
    .catch(function(error) {
      console.log("Remove failed: " + error.message)
    });
  }

}
export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
