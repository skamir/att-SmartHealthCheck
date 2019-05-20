import {Injectable} from '@angular/core';

@Injectable()
export class AppComponentService{
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

  getRandomLocation(lng, lat, radius: number): any {
    const u = this.getRandomInt(1000000000) / 1000000000;
    const v = this.getRandomInt(1000000000) / 1000000000;

    const w = radius * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);
    return {lng : lng + x, lat : lat + y, label : this.getRandomPhone()};
  }


  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  getRandomPhone(): string {
    const randomNumber = Math.floor(Math.random() * 9000000000) + 1000000000;
    return this.formatPhoneNumber(randomNumber);
  }

  formatPhoneNumber(phoneNumberString) {
    const cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      const intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return null;
  }
}
