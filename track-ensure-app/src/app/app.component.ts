import {Component, OnDestroy, OnInit} from '@angular/core';
import {Asset, Coords} from "./model/asset.interface";
import {AssetsService} from "./services/assets.service";
import {Observable, Subscription} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  public title = 'track-ensure-app';
  public latitude: string = '';
  public longitude: string = '';
  public assets$: Observable<Asset[]> | undefined;
  public assets: Asset[] = [];
  public _asset$ = Subscription.EMPTY;
  public assetsForm: FormGroup;
  public isSelected = false;
  constructor(private assetsService: AssetsService, private readonly fb: FormBuilder) {
    this.assetsForm = this.buildForm();
 }
  ngOnInit() {
    this.assets = this.assetsService.getAssets();
  }
  ngOnDestroy() {
    this._asset$.unsubscribe()
  }
  public buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    })
  }

  public addAsset() {
    const newAsset = Object.assign({id: Date.now()}, this.assetsForm.value);
    this.assetsService.setAsset(newAsset)
    this.assetsForm.reset()
    this.assets = this.assetsService.getAssets()
  }
  public getCoords(value: Coords) {
    this.latitude = value.latitude;
    this.longitude = value.longitude
  }
  public triggerSelect(value: boolean) {
    this.isSelected = value
  }
}
