import { Component, OnInit, DoCheck, AfterViewInit} from '@angular/core';
import { FriesOrderService } from '../../services/fries-order.service';
import { LocationService } from '../../services/location.service';
import { Location } from '../../models/location';
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
  public location: Location;

  // Manual address data
  public manualAddress: boolean;
  public street: string;
  public neighborhood: string;
  public extNumber: number;
  public intNumber: number;

  constructor(
    private _friesOrderService: FriesOrderService,
    private _locationService: LocationService
  ) {
    this.objects2Print = this._friesOrderService.getObjects2Print();
    this.manualAddress = false;
    this.street = '';
    this.neighborhood = '';
    this.extNumber = 0;
    this.intNumber = 0;
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
    let location = this.marker.getLatLng();
    if((this.location.latitude != location.lat) &&
       (this.location.longitude != location.lng)){
        
        this.location.latitude = location.lat;
        this.location.longitude = location.lng;
        this._locationService.getAddress(location.lat.toString(),location.lng.toString()).subscribe(
          result => {
                     this.location.address = result.items[0].address.label;
                     //console.log(result);
         },
          error => {
                    console.log(<any>error);
        }
       )

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
                      this.location = new Location(e.latlng.lat,e.latlng.lng,true,'','');
                      if(localStorage.getItem('manualAddress')){this.location.manualAddress = localStorage.getItem('manualAddress')}
                      this._locationService.getAddress(e.latlng.lat.toString(),e.latlng.lng.toString()).subscribe(
                        result => {
                         this.location.address = result.items[0].title;
                        },
                        error => {
                          console.log(<any>error);
                        }
                      )
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

  onSubmitManualAddress(){
    let setManualAdress = this.street.concat(' ','#',this.extNumber.toString());

    if( this.intNumber > 0){
      setManualAdress = setManualAdress.concat(', Int. ',this.intNumber.toString());
    }
    setManualAdress = setManualAdress.concat(', Col. ',this.neighborhood);

    this.location.manualAddress = setManualAdress;
    localStorage.setItem('manualAddress', this.location.manualAddress);
  }
}
