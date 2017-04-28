import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ApiService {
    response: any;

    public host: string = 'http://loccarplus.com/api';

    //Headers needed to correctly access data from the controller
    public headers = new Headers({ 'Content-Type': 'application/json' });
    public options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) {

    }

    toGetNotification(sessionid, sessiontoken) {
        return Observable.interval(60000)
            .flatMap(() => this.http.get(this.host + '/location/get_info_car/' + sessionid + '/' + sessiontoken)
                .map(response => response.json())
            );
    }

    //************************* HTTP REQUEST FOR USER DATA *******************************

    /*Post function for log in user*/
    toUserLogin(login_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/user/login', login_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for log out user*/
    toUserLogout(logout_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/user/logout', logout_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for register a new user*/
    toUserRegister(register_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/user/register', register_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for recovery password*/
    toForgotPassword(account_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/user/forgot', account_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for edit password*/
    toUpdatePassword(password_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/user/change_pass', password_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for edit data user*/
    toUserEdit(session_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/user/edit', session_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for save changes in user data*/
    toUserUpdate(user_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/user/save', user_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    //************************* HTTP REQUEST FOR CARS DATA *******************************
    /*Post function for add new cars to user logged*/
    toAddNewCars(car_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/add', car_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

		/*Post function for delete a car to user logged*/
    toDeleteCars(car_info) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/delete', car_info, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for get specific car for user logged*/
    toGetCarInfo(car_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/get_info_car', car_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for enable alarm and location for specific car*/
    toEnableAlarm(car_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/enable_alarm', car_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for disable alarm and location for specific car*/
    toDisableAlarm(car_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/disable_alarm', car_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for get a token for share a current car a other user*/
    toTokenShare(sessionid, sessiontoken, carid) {
        return new Promise(resolve => {
            this.http.get(this.host + '/car/enable_share/' + sessionid + '/' + sessiontoken + '/' + carid)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for validate a token and get the car info*/
    toValidateTokenShare(user_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/share_token', user_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for enable a share car to specific car*/
    toEnableShare(share_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/share_car', share_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for disable a share car to specific car*/
    toDisableShare(share_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/car/disable_share', share_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for get specific shared car for user logged*/
    toGetShareCarInfo(car_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/share/get_info_car', car_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for enable alarm and location for specific shared car*/
    toEnableShareAlarm(car_share_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/share/enable_car_alarm', car_share_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for disable alarm and location for specific shared car*/
    toDisableShareAlarm(car_share_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/share/disable_car_alarm', car_share_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                });
        });
    }

    /*Post function for save the notification token in the server for logged user*/
    toSaveNotificationToken(notification_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/notification/save_token', notification_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                })
        })
    }

		/*Post function for save the notification token in the server for logged user*/
    toGetNotificationLog(notification_session) {
        return new Promise(resolve => {
            this.http.post(this.host + '/notification/log_list', notification_session, this.options)
                .map(res => res.json())
                .subscribe(data => {
                    this.response = data;
                    resolve(this.response);
                })
        })
    }
}
