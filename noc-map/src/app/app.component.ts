import {Component, OnInit} from '@angular/core';
import {AppComponentService} from './app.component.service';
import {MapLocationModel} from './localtion.model';
import * as _ from 'lodash';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    dataIsReady = false;
    markers;
    cellolarSites;
    currentLocation;
    lng;
    lat;
    radius: number = 0.005;
    zoom: number = 8;

    numberOfmarkers: number = 20;

    origin;
    destination;
    constructor(private _appComponentService: AppComponentService) {
    }

    ngOnInit(): void {
        this.getCurrentGeoLocation();
    }

    async getCurrentGeoLocation() {
        this.currentLocation = await this._appComponentService.getPosition();
        this.lng = this.currentLocation.lng;
        this.lat = this.currentLocation.lat;
        this.markers = [];
        for (let i = 0; i < this.numberOfmarkers; i++) {
            this._appComponentService.getRandomPosition(this.radius, this.lat, this.lng).subscribe((tmp: MapLocationModel) => {
                tmp.icon = '../assets/error.png';
                this.markers.push(tmp);
                console.log(this.markers)
                if (i === this.numberOfmarkers - 1) {
                    this.dataIsReady = true;
                    this.getDirection();

                }
            });
        }
       // this.getDirection();


    }

    removeMarkers() {
        this.markers = [];
        this._appComponentService.sendNotificationToBe().subscribe(
            response => console.log(response),
            err => console.log(err)
        );
    }


    resetMarker(index): void {
        this.markers.splice(index, 1);
    }

    getDirection() {
        this.origin = { lat: this.markers[this.markers.length - 1].geoLocation.latitude, lng: this.markers[this.markers.length - 1].geoLocation.longitude };
        this.destination = { lat: this.markers[0].geoLocation.latitude, lng: this.markers[0].geoLocation.longitude  };
    }
}
