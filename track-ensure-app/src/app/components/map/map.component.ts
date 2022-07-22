import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from "@angular/core";
import { Coords } from "src/app/model/asset.interface";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnChanges {
  @Input() latitude!: string;
  @Input() longitude!: string
  @ViewChild('map', {static: true}) mapElement!: ElementRef;
  constructor() {
  }

  ngOnChanges(changes: SimpleChanges) {
    const latitude = changes.latitude.currentValue;
    const longitude = changes.longitude.currentValue;
    this.renderMap(latitude, longitude);
  }

  ngOnInit() {
    this.renderMap();
  }

  loadMap = (latitude: string, longitude: string) => {
    // @ts-ignore
    let map = new window['google'].maps.Map(this.mapElement.nativeElement, {
      center: {lat: +latitude, lng: +longitude},
      zoom: 4
    });

    // @ts-ignore

    let marker = new window['google'].maps.Marker({
      position: {lat: +latitude, lng: +longitude},
      map: map,
      title: '',
      draggable: true,
      // @ts-ignore
      animation: window['google'].maps.Animation.DROP,
    });

    let contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      '</div>' +
      '<h3 id="thirdHeading" class="thirdHeading">{{ Track Ensure Maps }}</h3>' +
      '<div id="bodyContent">' +
      '<p>{{  }}</p>' +
      '</div>' +
      '</div>';

    // @ts-ignore
    let infowindow = new window['google'].maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function () {
      infowindow.open(map, marker);
    });

  }

  renderMap(latitude = '49', longitude = '24') {
    // @ts-ignore
    window[`initMap`] = () => {
      this.loadMap(latitude, longitude);
    }
    if (!window.document.getElementById('google-map-script')) {
      let s = window.document.createElement("script");
      s.id = "google-map-script";
      s.type = "text/javascript";
      s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBLsfr_KJNsbpbSAo8ASC8snKQg-7tm1Kk&callback=initMap&v=weekly";
      window.document.body.appendChild(s);
    } else {
      this.loadMap(latitude, longitude);
    }
  }
}
