import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, Platform, ToastController, ViewController } from 'ionic-angular';
import { ConnectivityService } from '../../providers/connectivity-service';

declare var google;

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage {
    @ViewChild('map') mapElement: ElementRef;

    map: any;
    mapInitialised: boolean = false;
    apiKey: string = "AIzaSyBSsNlTRz12yLvI6tXznHaebL5Ehh6q14Y";

    public marker: any;
    public content: any;
    public latlng: any;

    public lat: any;
    public long: any;

    constructor(public nav: NavController, public params: NavParams, public connectivityService: ConnectivityService, public platform: Platform, public alert: AlertController, public toast: ToastController, public viewCtrl: ViewController) {
        platform.ready().then(() => {
            this.lat = params.get('lat');
            this.long = params.get('long');


            this.loadGoogleMaps();
        });
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    loadGoogleMaps() {
        this.addConnectivityListeners();

        if (typeof google == "undefined" || typeof google.maps == "undefined") {
            console.log("Google maps JavaScript needs to be loaded.");
            console.log('Disable map');

            if (this.connectivityService.isOnline()) {
                console.log("online, loading map");

                //Load the SDK
                window['mapInit'] = () => {
                    this.initMap();
                    console.log('Enable map');
                }
                let script = document.createElement("script");
                script.id = "googleMaps";

                if (this.apiKey) {
                    script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
                } else {
                    script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';
                }
                document.body.appendChild(script);
            }
        }
        else {
            if (this.connectivityService.isOnline()) {
                console.log("showing map");
                this.initMap();
                console.log('Enable map');
            }
            else {
                console.log("disabling map");
                console.log('Disable map');
            }
        }
    }

    initMap() {
        this.mapInitialised = true;

        let latLng = new google.maps.LatLng(this.lat, this.long);
        let mapOptions = {
            center: latLng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        this.latlng = new google.maps.LatLng(this.lat, this.long);
        this.marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: this.latlng
        });
        this.content = "<h5>Your car last location!</h5>";
        this.addInfoWindow(this.marker, this.content);
    }

    addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
            content: content
        });

        google.maps.event.addListener(marker, 'click', () => {
            infoWindow.open(this.map, marker);
        });
    }

    addConnectivityListeners() {
        let onOnline = () => {
            setTimeout(() => {
                if (typeof google == "undefined" || typeof google.maps == "undefined") {
                    this.loadGoogleMaps();
                } else {
                    if (!this.mapInitialised) {
                        this.initMap();
                    }
                    console.log('Enable map');
                }
            }, 2000);
        };
        let onOffline = () => {
            console.log('Disable map');
        };
        document.addEventListener('online', onOnline, false);
        document.addEventListener('offline', onOffline, false);
    }

}
