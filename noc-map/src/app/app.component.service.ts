import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AppComponentService {
  constructor(private _httpClient : HttpClient){

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


  getRandomPosition(radius: number, lat : number, lng : number): any {
    const userBody = '{"userId" : 12345}';
    const headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    return this._httpClient.get( `http://localhost:8095/service/generate?radius=${radius}&lat=${lat}&lng=${lng}`);
  }
}
