import {Component, OnInit} from '@angular/core';
import {AppComponentService} from './app.component.service';
import {LocaltionModel, MapLocationModel} from "./localtion.model";

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



  constructor(private _appComponentService: AppComponentService) {}

  ngOnInit(): void {
    this.getCurrentGeoLocation();
  }

  async getCurrentGeoLocation() {
    this.currentLocation = await this._appComponentService.getPosition();
    this.lng = this.currentLocation.lng;
    this.lat = this.currentLocation.lat;
    this.markers = [];
    for (let i = 0; i < 30; i++) {
      //http://localhost:8094/service/generate?radius=0.01&lat=-7.4476999999999975&lng=100.2149
      this._appComponentService.getRandomPosition(this.radius, this.lat, this.lng).subscribe((tmp: MapLocationModel) => {
        tmp.icon = '../assets/error.png';
        this.markers.push(tmp);
        console.log(this.markers)
      });
    }
  }
}
