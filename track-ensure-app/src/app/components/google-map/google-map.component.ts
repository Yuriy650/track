import {
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild
} from "@angular/core";
import {Asset} from "../../model/asset.interface";

@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.scss']
})
export class GoogleMapComponent implements AfterViewInit, OnChanges{
  @Input() latitude!: string;
  @Input() longitude!: string;
  @Input() assets!: Asset[];
  @Input() isSelected: boolean = false
  markers: {}[] = [
  /* {
      position: new google.maps.LatLng(40.73061, 73.935242),
      // @ts-ignore
      map: this.map,
      title: "Marker 1"
    },
    {
      position: new google.maps.LatLng(32.06485, 34.763226),
      // @ts-ignore
      map: this.map,
      title: "Marker 2"
    }*/
  ];
  // @ts-ignore
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map!: google.maps.Map;
  // @ts-ignore
  coordinates = this.getCoords(this.latitude, this.longitude);
  marker: any;
  mapOptions!: google.maps.MapOptions;
  constructor() {
    // @ts-ignore
    this.coordinates = this.getCoords(this.latitude, this.longitude);
    this.changeMarker(this.coordinates, this.isSelected);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.changeMarkersList(changes?.assets?.currentValue)
    const latitude = changes.latitude.currentValue;
    const longitude = changes.longitude.currentValue;
    this.coordinates = this.getCoords(latitude, longitude);
    this.changeMarker(this.coordinates, true)
this.mapInitial()
  }

  ngAfterViewInit() {
    this.mapInitial();
  }

  public getCoords(latitude: number, longitude: number) {
    return new google.maps.LatLng(latitude, longitude)
  }
  public changeMarker(coords: any, trigger: boolean) {
    console.log(trigger)
    this.marker = new google.maps.Marker({
      position: coords,
      map: this.map,
    }/*this.markers[0]*/);
    this.mapOptions = {
      center: coords,
      zoom: trigger ? 8 : 2
    };
  }
  public changeMarkersList(assets: Asset[]) {
    let markersList: {}[] = []
    assets.map(asset => {
      const lat = asset.latitude;
      const lng = asset.longitude;
      // @ts-ignore
      const marker = {position: { lat, lng}, map: this.map, title: asset.name + ' '+ asset.type};
      markersList.push(marker)
    })
    console.log(markersList);
    this.markers = markersList
  }
  public mapInitial() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.addListener("click", () => {
      console.log(this.marker)
      const infoWindow = new google.maps.InfoWindow({
        // @ts-ignore
        content: this.marker.getTitle()
      });
      // @ts-ignore
      infoWindow.open(this.marker.getMap(), this.marker);
    });
    this.marker.setMap(this.map);
    this.loadMarkers();
  }
  public loadMarkers(): void {
    this.markers.forEach(markerInfo => {
      const marker = new google.maps.Marker({
        ...markerInfo
      });
      const infoWindow = new google.maps.InfoWindow({
        // @ts-ignore
        content: marker.getTitle()
      });
      marker.addListener("click", () => {
        // @ts-ignore
        infoWindow.open(marker.getMap(), marker);
      });
      marker.setMap(this.map);
    });
  }
}
