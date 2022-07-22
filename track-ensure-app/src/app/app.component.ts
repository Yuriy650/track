import {Component, OnInit} from '@angular/core';
import {Asset, Coords} from "./model/asset.interface";
import {AssetsService} from "./services/assets.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public title = 'track-ensure-app';
  public latitude: string = '';
  public longitude: string = '';
  public assets: Asset[] = [];
  public isSelected = false;
  constructor(private assetsService: AssetsService) {
 }
  ngOnInit() {
    this.assets = this.assetsService.getAssets();
  }
  public update(assets: Asset[]) {
    this.assets = assets
  }
  public getCoords(value: Coords) {
    this.latitude = value.latitude;
    this.longitude = value.longitude
  }
  public triggerSelect(value: boolean) {
    this.isSelected = value
  }
}
