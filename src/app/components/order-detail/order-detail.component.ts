import { Component, OnInit, DoCheck, AfterViewInit} from '@angular/core';
import { FriesOrderService } from '../../services/fries-order.service';
import { LocationService } from '../../services/location.service';
import { Coords } from '../../models/coords';
import * as L from 'leaflet';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [FriesOrderService]
})
export class OrderDetailComponent implements OnInit, DoCheck, AfterViewInit {
  public objects2Print = [];
  public marker;
  public coords: Coords;

  constructor(
    private _friesOrderService: FriesOrderService,
    private _locationService: LocationService
  ) {
    this.objects2Print = this._friesOrderService.getObjects2Print();
    this.coords = new Coords(0,0,false);
  }

  ngOnInit(): void {
  }


  ngAfterViewInit(): void {
    this.initMap();
  }
  ngDoCheck(): void {
    this.objects2Print = this._friesOrderService.getObjects2Print();
  }

  mouseUp(){
    let coords = this.marker.getLatLng();
    this.coords.latitude = coords.lat;
    this.coords.longitude = coords.lng;
    console.log(this.coords);
  }

  private initLocation(){
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(showUbication,errorUbication);

      function showUbication (ubication) {
        const lng = ubication.coords.longitude;
        const lat = ubication.coords.latitude;

        this.map = L.map('map').setView([lng, lat], 16);

        var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        var marker =  L.marker([51.5, -0.09], {draggable:'true'});
        marker.on('dragend', function(event){
          var marker = event.target;
          var position = marker.getLatLng();
          this.corrds = marker.getLatLng();
          console.log(this.corrds);
          marker.setLatLng(position,{draggable:'true'}).bindPopup(position).update();
        });

        var circle = L.circle([51.508, -0.11], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        });

        tiles.addTo(this.map);
        marker.addTo(this.map);

      }
      function errorUbication (e){
        if(e.code == 1){
          alert("Por favor da permiso a tu ubicación, de lo contrario deberás introducir tu dirección manualmente.");
        }else{
          alert("No podemos acceder a tu ubicación, por favror introduce tu dirección en el formulario.");
        }
      }
    }
  }

  initMap(): void {

    var map;
    var tiles;

    map = new L.map('map').locate({setView: true, maxZoom: 17});

    tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                  {
                                    maxZoom: 19,
                                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                  }
                                ).addTo(map);
    map.once('locationfound',
              e => {
                      this.marker = new L.marker([e.latlng.lat, e.latlng.lng],{draggable:'true'}).addTo(map);
                      this.coords.latitude = e.latlng.lat;
                      this.coords.longitude = e.latlng.lng;
                      this.coords.found = true;
                      console.log(this.coords);
                    }
            );

    function derp(){
      // [20.529385700000002, -100.78873410000001]
    //var marker =  L.marker(, {draggable:'true'});

    /*
    marker.on('dragend', function(event){
      var marker = event.target;
      var position = marker.getLatLng();
      this.corrds = marker.getLatLng();
      console.log(this.corrds);
      marker.setLatLng(position,{draggable:'true'}).bindPopup(position).update();
    });
    */

    /*
    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    });
    */

    /*
    var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(this.map);

    function onMapClick(e) {
      alert("You clicked the map at " + e.latlng);
    }

    this.map.on('click', onMapClick);

    this.map.on("click", e => {
      console.log(e.latlng); // get the coordinates
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map); // add the marker onclick
    });
    */
    }
    
  }

  deleteOrder(id){
    localStorage.removeItem(id.toString());
  }
}
