import { UsersPage } from './../users/users';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddRoomPage } from '../add-room/add-room';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { ModalController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-room',
  templateUrl: 'room.html',
})
export class RoomPage {
  rooms = [];
  superuser = false;
  nickname ;
  ref = firebase.database().ref('chatrooms/');
  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) {
    this.ref.on('value', resp => {
      this.rooms = [];
      this.rooms = snapshotToArray(resp);
    });
    this.nickname = this.navParams.get("nickname");
    console.log(this.nickname);
    if (this.nickname == 'admin')
    {
      this.superuser = true;
    }
  }
  addRoom() {
    this.navCtrl.push(AddRoomPage);
  }
  joinRoom(key) {
    this.navCtrl.setRoot(HomePage, {
      key:key,
      nickname:this.navParams.get("nickname")
    });
  }
  deleteRoom(key)
  {
    console.log('delete room')
    var room = firebase.database().ref('chatrooms/'+key)
      room.remove()
      .then(()=>{
        console.log('room deleted');
      })
      .catch(function(error) {
        console.log("Remove failed: " + error.message)
      });
  }
  listUsers(key)
  {
    console.log('list users')
    let users = firebase.database().ref('chatrooms/'+key+'/chats')
    users.once("value",(users)=>{
      let Users  = users;
      console.log(users);
      const modal = this.modalCtrl.create(UsersPage,{
        'key':key,
        'users':Users}
        )
        modal.present()
    })
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
