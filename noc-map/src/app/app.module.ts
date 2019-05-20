import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import {AppComponentService} from './app.component.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAk3q3j_Yojm0t8o1TPQx9D4pSj0xr7Ipk'
    })
  ],
  providers: [AppComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
