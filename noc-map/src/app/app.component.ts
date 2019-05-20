import {Component, OnInit} from '@angular/core';
import {AppComponentService} from './app.component.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  markers;
  cellolarSites;
  currentLocation;
  lng;
  lat;
  radius: number = 0.005;
  zoom: number = 8;



  constructor(private _appComponentService: AppComponentService) {

  }

  ngOnInit(): void {
    this.getCurrentGeoLocation();
  }

  getCellularSites() {
    this.cellolarSites = [];
    for (let i = 0; i < 30; i++) {
      const tmp = this._appComponentService.getRandomLocation(this.lng, this.lat, this.radius + 300);
      tmp.label = this._appComponentService.formatPhoneNumber(Math.floor(100000000 + Math.random() * 900000000));
      this.cellolarSites.push(tmp);
      console.log(this.cellolarSites);
    }
  }

  async getCurrentGeoLocation() {
    this.currentLocation = await this._appComponentService.getPosition();
    this.lng = this.currentLocation.lng;
    this.lat = this.currentLocation.lat;
    console.log('currentLocation', this.currentLocation);
    this.markers = [];
    for (let i = 0; i < 30; i++) {
      const tmp = this._appComponentService.getRandomLocation(this.lng, this.lat, this.radius);
      tmp.icon = '../assets/error.png';
      this.markers.push(tmp);
      console.log(this.markers);
    }
  }
}
