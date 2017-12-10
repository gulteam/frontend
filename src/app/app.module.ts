import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {ConnectionService} from "./service/connection.service";
import {UserService} from "./service/user.service";
import {AuthComponent} from "./components/auth/auth.component";
import {AppRoutingModule} from "./module/app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ConnectionService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
