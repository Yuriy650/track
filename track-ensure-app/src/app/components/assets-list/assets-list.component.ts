import {AssetsService} from "../../services/assets.service";
import {Component, Input, OnChanges, Output, SimpleChanges} from "@angular/core";
import {Asset, Coords} from "../../model/asset.interface";
import { EventEmitter } from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-assets-list',
  templateUrl: './assets-list.component.html',
  styleUrls: ['./assets-list.component.scss']
})

export class AssetsListComponent implements OnChanges {
  @Input() assets: Asset[] = [];
  @Output() coords = new EventEmitter<Coords>();
  @Output() isSelectedAsset = new EventEmitter<boolean>()

  public editForm: FormGroup;
  public selected = 0;
  public currentAsset!: Asset;
  public isSelected = false;
  constructor(private assetsService: AssetsService, private readonly fb: FormBuilder) {
    this.editForm = this.buildForm()
  }

  ngOnChanges(changes: SimpleChanges) {
  this.assets = changes.assets.currentValue;
  }
  public buildForm(): FormGroup {
    return this.fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    })
  }

  public selectAsset(item: Asset) {
    this.isSelected = true
    this.selected = 1;
    const coord = {
      latitude: item.latitude,
      longitude: item.longitude}
    this.coords.emit(coord)
    this.isSelectedAsset.emit(this.isSelected)
  }

  public removeAsset(id: number) {
    if(id) {
      this.assetsService.deleteAsset(id)
      this.assets = this.assets.filter(item => item.id !== id);
    }
  }

  public saveAsset() {
    const newAsset = Object.assign({id: this.editForm.value.id}, this.editForm.value);
    this.assetsService.setAsset(newAsset);
    this.assets = this.assetsService.getAssets();
    this.editForm.reset()
  }

  public editAsset(id: number) {
    // @ts-ignore
    this.currentAsset = JSON.parse(localStorage.getItem(id.toString()));
    this.editForm.patchValue(this.currentAsset);
  }
}
