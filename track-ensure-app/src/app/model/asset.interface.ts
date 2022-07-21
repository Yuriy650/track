import {AssetType} from "../enums/asset-type.enum";

export interface Asset {
  id: number;
name: string;
type: AssetType;
latitude: string;
longitude: string
}

export interface Coords {
  latitude: string,
  longitude: string
}
