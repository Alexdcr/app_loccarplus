import { Component } from '@angular/core';
import { NavController, NavParams, Platform, AlertController, ModalController, ToastController } from 'ionic-angular';

import { MessagesDetailsPage } from '../messages-details/messages-details';
import { ApiService } from '../../providers/api-service';
import { NativeStorage } from 'ionic-native';

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
  providers: [ApiService]
})
export class MessagesPage {
  //for error messages
  public wrong_session: {
    session_id: boolean,
    session_token: boolean,
    user: boolean,
    text: string
  } = {
    session_id: false,
    session_token: false,
    user: false,
    text: ""
  };

  //session data
  public user_session: {
    session_id: number,
    session_token: any,
  } = {
    session_id: null,
    session_token: ''
  };

  public user_session_info: {
    id: number,
    session_token: string
  } = {
    id: null,
    session_token: ""
  };

  /*Var for select list*/
  public date_list: string = "today";
  /*Var for message list by date*/
  public today_list: {
    id: number,
    message: string,
    model: string,
    type: string,
    date: string
  }[] = [{
    id: null,
    message: "",
    model: "",
    type: "",
    date: ""
  }];
  public week_list: {
    id: number,
    message: string,
    model: string,
    type: string,
    date: string
  }[] = [{
    id: null,
    message: "",
    model: "",
    type: "",
    date: ""
  }];
  public month_list: {
    id: number,
    message: string,
    model: string,
    type: string,
    date: string
  }[] = [{
    id: null,
    message: "",
    model: "",
    type: "",
    date: ""
  }];
  public all_list: {
    id: number,
    message: string,
    model: string,
    type: string,
    date: string
  }[] = [{
    id: null,
    message: "",
    model: "",
    type: "",
    date: ""
  }];
  //Count data Var
  public count_today_list: number = null;
  public count_week_list: number = null;
  public count_month_list: number = null;
  public count_all_list: number = null;

  //post request
  public response: any;

  constructor(public nav: NavController, public params: NavParams, public apiServ: ApiService, public platform: Platform, public alert: AlertController, public modal: ModalController, public toast: ToastController) {
    platform.ready().then(() => {
      NativeStorage.getItem('user_session_info').then(
        (data_session) => {
          this.user_session_info = JSON.parse(data_session);
          this.user_session.session_id = this.user_session_info.id;
          this.user_session.session_token = this.user_session_info.session_token;
        },
        (error) => { });
      NativeStorage.getItem('today_list').then(
        (data_today_list) => {
          this.today_list = JSON.parse(data_today_list);
        },
        (error) => { });

      NativeStorage.getItem('week_list').then(
        (data_week_list) => {
          this.week_list = JSON.parse(data_week_list);
        },
        (error) => { });

      NativeStorage.getItem('month_list').then(
        (data_month_list) => {
          this.month_list = JSON.parse(data_month_list);
        },
        (error) => { });

      NativeStorage.getItem('all_list').then(
        (data_all_list) => {
          this.all_list = JSON.parse(data_all_list);
        },
        (error) => { });

      NativeStorage.getItem('count_today_list').then(
        (data_count_today_list) => {
          this.count_today_list = JSON.parse(data_count_today_list);
        },
        (error) => { });

      NativeStorage.getItem('count_week_list').then(
        (data_count_week_list) => {
          this.count_week_list = JSON.parse(data_count_week_list);
        },
        (error) => { });

      NativeStorage.getItem('count_month_list').then(
        (data_count_month_list) => {
          this.count_month_list = JSON.parse(data_count_month_list);
        },
        (error) => { });

      NativeStorage.getItem('count_all_list').then(
        (data_count_all_list) => {
          this.count_all_list = JSON.parse(data_count_all_list);
        },
        (error) => { });
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.apiServ.toGetNotificationLog(this.user_session)
        .then(data => {
          this.response = data;
          if (this.response.status == "success") {
            //Re assign the new data a storage
            NativeStorage.remove('today_list').then(() => { }, (error) => { });
            NativeStorage.setItem('today_list', JSON.stringify(this.response.today_list)).then(() => { }, error => { });
            NativeStorage.remove('week_list').then(() => { }, (error) => { });
            NativeStorage.setItem('week_list', JSON.stringify(this.response.week_list)).then(() => { }, error => { });
            NativeStorage.remove('month_list').then(() => { }, (error) => { });
            NativeStorage.setItem('month_list', JSON.stringify(this.response.month_list)).then(() => { }, error => { });
            NativeStorage.remove('all_list').then(() => { }, (error) => { });
            NativeStorage.setItem('all_list', JSON.stringify(this.response.all_list)).then(() => { }, error => { });
						NativeStorage.remove('count_today_list').then(() => { }, (error) => { });
            NativeStorage.setItem('count_today_list', JSON.stringify(this.response.count_today_list)).then(() => { }, error => { });
            NativeStorage.remove('count_week_list').then(() => { }, (error) => { });
            NativeStorage.setItem('count_week_list', JSON.stringify(this.response.count_week_list)).then(() => { }, error => { });
            NativeStorage.remove('count_month_list').then(() => { }, (error) => { });
            NativeStorage.setItem('count_month_list', JSON.stringify(this.response.count_month_list)).then(() => { }, error => { });
            NativeStorage.remove('count_all_list').then(() => { }, (error) => { });
            NativeStorage.setItem('count_all_list', JSON.stringify(this.response.count_all_list)).then(() => { }, error => { });
						//Assign the new data list a date list
            this.today_list = this.response.today_list;
            this.week_list = this.response.week_list;
            this.month_list = this.response.month_list;
            this.all_list = this.response.all_list;
						this.count_today_list = this.response.count_today_list;
            this.count_week_list = this.response.count_week_list;
            this.count_month_list = this.response.count_month_list;
            this.count_all_list = this.response.count_all_list;

            refresher.complete();
          } else if (this.response.status == "error" && this.response.type == "session_id") {
            this.wrong_session.session_id = true;
            this.wrong_session.session_token = false;
            this.wrong_session.user = false;
            this.wrong_session.text = "There was an error saving your information, please try again later.";
            refresher.complete();
          } else if (this.response.status == "error" && this.response.type == "session_token") {
            this.wrong_session.session_id = false;
            this.wrong_session.session_token = true;
            this.wrong_session.user = false;
            this.wrong_session.text = "There was an error saving your information, please try again later.";
            refresher.complete();
          } else if (this.response.status == "error" && this.response.type == "User not logged") {
            this.wrong_session.session_id = true;
            this.wrong_session.session_token = true;
            this.wrong_session.user = false;
            this.wrong_session.text = "An error occurred with the session, please try again later.";
            refresher.complete();
          }
        });
      refresher.complete();
    }, 1000);
  }

  goToInfo(message, date, model, type) {
    let modal = this.modal.create(MessagesDetailsPage, { 'message': message, 'date': date, 'model': model, 'type': type });
    modal.present();
  }

}
