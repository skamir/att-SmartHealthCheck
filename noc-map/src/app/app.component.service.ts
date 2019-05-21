import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MapLocationModel} from "./localtion.model";
import {Observable} from "rxjs";

@Injectable()
export class AppComponentService {
    constructor(private _httpClient: HttpClient) {

    }

    getPosition(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resp => {
                    resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
                },
                err => {
                    reject(err);
                });
        });
    }


    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }


    getRandomPosition(radius: number, lat: number, lng: number, numberOfLocations: number): any {
        const userBody = '{"userId" : 12345}';
        return this._httpClient.get(`http://localhost:8095/service/generate?radius=${radius}&lat=${lat}&lng=${lng}&numberOfPoints=${numberOfLocations}`);
    }

    sendNotificationToBe(): any {
        const body = new FormData();
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        return this._httpClient.get(`http://localhost:8095/service/send`, body, httpOptions);
    }

    getRandomAroundCenterPoint(radius, lat, lng, numberOfPoints): Promise<MapLocationModel[]> {
        return new Promise((resolve, reject) => {
            this.getRandomPosition(radius, lat, lng, numberOfPoints).subscribe((locations: MapLocationModel[]) => {
                locations.map((location) => {
                    location.icon = '../assets/error.png';
                });
                resolve(locations);
            });
        });
    }


    getSingleRandomPoint(radius, lat, lng): Promise<MapLocationModel> {
        return new Promise((resolve, reject) => {
            this.getRandomPosition(0.04, lat, lng, 1).subscribe((locations: MapLocationModel[]) => {
                resolve(locations[0]);
            });
        });
    }
}
