import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AgmCoreModule} from '@agm/core';
import {AppComponentService} from './app.component.service';
import {HttpClientModule} from '@angular/common/http';
import {AgmDirectionModule} from "agm-direction";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAk3q3j_Yojm0t8o1TPQx9D4pSj0xr7Ipk'
    }),
    AgmDirectionModule
  ],
  providers: [AppComponentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
