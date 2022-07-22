import {Component, EventEmitter, Input, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AssetsService} from "../../services/assets.service";
import {Asset} from "../../model/asset.interface";

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.scss']
})
export class ModalFormComponent {
  @Output() updateAssets = new EventEmitter<Asset[]>()
  public assets: Asset[] = [];
  public assetsForm: FormGroup;
  constructor(private readonly fb: FormBuilder, private assetsService: AssetsService) {
    this.assetsForm = this.buildForm();
  }
  public buildForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]]
    });
  }
  public addAsset() {
    const newAsset = Object.assign({id: Date.now()}, this.assetsForm.value);
    this.assetsService.setAsset(newAsset)
    this.assetsForm.reset()
    this.assets = this.assetsService.getAssets();
    this.updateAssets.emit(this.assets)
  }
}
