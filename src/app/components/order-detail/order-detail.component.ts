import { Component, OnInit, DoCheck, AfterViewInit} from '@angular/core';
import { FriesOrderService } from '../../services/fries-order.service';
import { LocationService } from '../../services/location.service';
import { Send2whatsappService } from '../../services/send2whatsapp.service';
import { Customer } from '../../models/customer';
import { icon, Marker } from 'leaflet';
import * as L from 'leaflet';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [FriesOrderService,
              LocationService,
              Send2whatsappService
             ]
})
export class OrderDetailComponent implements OnInit, DoCheck, AfterViewInit {
  public objects2Print = [];
  public marker;
  public customer: Customer;

  // Manual address data
  public manualAddress: boolean;
  public street: string;
  public neighborhood: string;
  public extNumber: number;
  public intNumber: number;
  public name: string;
  public nameShow: string;
  public totalPrice: number;
  public hoverSendToWhatsappImg: string;

  constructor(
    private _friesOrderService: FriesOrderService,
    private _locationService: LocationService,
    private _send2WhatsappService: Send2whatsappService
  ) {
    this.objects2Print = this._friesOrderService.getObjects2Print();
    this.manualAddress = false;
    this.street = '';
    this.neighborhood = '';
    this.extNumber = 0;
    this.intNumber = 0;
    this.name = '';
    this.nameShow = '';
    this.totalPrice = 0;
    this.hoverSendToWhatsappImg = 'hola';
  }

  ngOnInit(): void {
    if(localStorage.getItem('customerName')){this.nameShow = localStorage.getItem('customerName')}
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngDoCheck(): void {
    this.objects2Print = this._friesOrderService.getObjects2Print();
    this.totalPrice = this._friesOrderService.getCompleteOrderPrice();
  }

  // When release the pointer on map the location is newly set
  mouseUp(){
    let location = this.marker.getLatLng();
    if((this.customer.latitude != location.lat) &&
       (this.customer.longitude != location.lng)){
        
        this.customer.latitude = location.lat;
        this.customer.longitude = location.lng;
        this._locationService.getAddress(location.lat.toString(),location.lng.toString()).subscribe(
          result => {
                     this.customer.address = result.items[0].address.label;
                     //console.log(result);
         },
          error => {
                    console.log(<any>error);
        }
       )

       }
  }

  // Inits the map
  initMap(): void {

    var map;
    var tiles;

    map = new L.map('map').locate({setView: true, maxZoom: 17});

    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    Marker.prototype.options.icon = iconDefault;

    tiles = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                  {
                                    maxZoom: 19,
                                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                  }
                                ).addTo(map);
    map.once('locationfound',
              e => {
                      this.marker = new L.marker([e.latlng.lat, e.latlng.lng], {draggable:'true'}).addTo(map);
                      this.customer = new Customer(e.latlng.lat,e.latlng.lng,true,'','','');
                      if(localStorage.getItem('manualAddress')){this.customer.manualAddress = localStorage.getItem('manualAddress')};
                      this._locationService.getAddress(e.latlng.lat.toString(),e.latlng.lng.toString()).subscribe(
                        result => {
                         this.customer.address = result.items[0].title;
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

  // Delete and order clicking on the garbage icon
  deleteOrder(id){
    localStorage.removeItem(id.toString());
  }

  // Submits the Adress that the user sets
  onSubmitManualAddress(form){
    let setManualAdress = this.street.concat(' ','Ext.',this.extNumber.toString());

    if( this.intNumber > 0){
      setManualAdress = setManualAdress.concat(', Int. ',this.intNumber.toString());
    }
    setManualAdress = setManualAdress.concat(', Col. ',this.neighborhood);

    this.customer.manualAddress = setManualAdress;
    localStorage.setItem('manualAddress', this.customer.manualAddress);

    form.reset();
  }

  // Submit the name that the user sets
  onSubmitName(form){
    localStorage.setItem('customerName', this.name);
    this.nameShow = this.name;

    form.reset();
  }

  // Sends the order to whatsapp
  sendToWhatsapp(){
    this._send2WhatsappService.send(this.customer.latitude, this.customer.longitude, this.manualAddress, this.objects2Print)
  }

  // Used to the hover of Whatsappicon and "Solicitar Pedido"
  changeStyle($event){
    this.hoverSendToWhatsappImg = $event.type == 'mouseover' ? 'hoverRequestOrder' : 'requestOrder';
  }

  myFunction(){
    alert("hola");
  }
}