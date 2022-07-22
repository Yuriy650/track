import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MapComponent} from "./components/map/map.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AssetsListComponent} from "./components/assets-list/assets-list.component";
import {GoogleMapComponent} from "./components/google-map/google-map.component";


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AssetsListComponent,
    GoogleMapComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
      FormsModule,
      ReactiveFormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
