import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ViewController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-messages-details',
  templateUrl: 'messages-details.html'
})
export class MessagesDetailsPage {
	//details data
	public noti_details: {
			message: string,
			model: string,
			type: string,
			date: string,
	} = {
			message: '',
			model: '',
			type: '',
			date: '',
	};

	constructor(public nav: NavController, public params: NavParams, public platform: Platform, public alert: AlertController, public viewCtrl: ViewController, public toast: ToastController) {
		platform.ready().then(() => {
				this.noti_details.message = this.params.get('message');
				this.noti_details.model = this.params.get('model');
				this.noti_details.type = this.params.get('type');
				this.noti_details.date = this.params.get('date');
		});
  }

	dismiss() {
			this.viewCtrl.dismiss();
	}

}
