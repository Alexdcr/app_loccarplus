import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { MenuPage } from '../pages/menu/menu';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { MapPage } from '../pages/map/map';
import { MessagesPage } from '../pages/messages/messages';
import { MessagesDetailsPage } from '../pages/messages-details/messages-details';
import { SettingsPage } from '../pages/settings/settings';
import { AccountPage } from '../pages/account/account';
import { CarsPage } from '../pages/cars/cars';
import { NewCarsPage } from '../pages/new-cars/new-cars';
import { ShareCarsPage } from '../pages/share-cars/share-cars';
import { ShareTokenPage } from '../pages/share-token/share-token';
import { ShareAddPage } from '../pages/share-add/share-add';
import { SharedCarInfoPage } from '../pages/shared-car-info/shared-car-info';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { AboutPage } from '../pages/about/about';

//Declarations extra modules
import { MultiPickerModule } from 'ion-multi-picker';

//Declarations for all providers
import { ApiService } from '../providers/api-service';
import { ConnectivityService } from '../providers/connectivity-service';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
    'core': {
        'app_id': 'a25de464'
    },
    'push': {
        'sender_id': '84171443848',
        'pluginConfig': {
            'ios': {
                'badge': true,
                'sound': true
            },
            'android': {
                'iconColor': '#1e88e5'
            }
        }
    }
};

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        RegisterPage,
        DashboardPage,
        SettingsPage,
        MapPage,
        MessagesPage,
				MessagesDetailsPage,
        MenuPage,
        AccountPage,
        CarsPage,
        NewCarsPage,
        ShareCarsPage,
        ShareTokenPage,
        ShareAddPage,
        SharedCarInfoPage,
        ForgotPasswordPage,
        ChangePasswordPage,
        AboutPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        CloudModule.forRoot(cloudSettings),
        MultiPickerModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        RegisterPage,
        DashboardPage,
        SettingsPage,
        MapPage,
        MessagesPage,
				MessagesDetailsPage,
        MenuPage,
        AccountPage,
        CarsPage,
        NewCarsPage,
        ShareCarsPage,
        ShareTokenPage,
        ShareAddPage,
        SharedCarInfoPage,
        ForgotPasswordPage,
        ChangePasswordPage,
        AboutPage
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, ConnectivityService, ApiService]
})
export class AppModule { }
