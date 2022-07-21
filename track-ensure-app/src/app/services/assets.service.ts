import {Injectable} from "@angular/core";
import {Asset} from "../model/asset.interface";
import {AssetType} from "../enums/asset-type.enum";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  public ASSETS: Asset[] = [{
    id: 1,
    name: 'TIR',
    type: AssetType.Truck,
    latitude: '50',
    longitude: '42'
  },
    {
      id: 2,
      name: 'BMW',
      type: AssetType.Trailer,
      latitude: '40',
      longitude: '25'
    }
  ]
  public getAssets() {
    let values = [],
      keys = Object.keys(localStorage),
      i = keys.length;
    while (i--) {
      values.push(localStorage.getItem(keys[i]));
    }
    // @ts-ignore
    return values.map(item => JSON.parse(item));
  }
  public setAsset(asset: Asset) {
    localStorage.setItem(String(asset.id), JSON.stringify(asset));
  }
  public deleteAsset(id: number) {
    localStorage.removeItem(id.toString())
  }
}
