import { Component, OnInit, DoCheck, AfterViewInit} from '@angular/core';
import { FriesOrderService } from '../../services/fries-order.service';
import { LocationService } from '../../services/location.service';
import { Customer } from '../../models/customer';
import * as L from 'leaflet';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [FriesOrderService]
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
    private _locationService: LocationService
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
    console.log(this.objects2Print);
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngDoCheck(): void {
    this.objects2Print = this._friesOrderService.getObjects2Print();
    this.totalPrice = this._friesOrderService.getCompleteOrderPrice();
  }

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

  deleteOrder(id){
    localStorage.removeItem(id.toString());
  }

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

  onSubmitName(form){
    localStorage.setItem('customerName', this.name);
    this.nameShow = this.name;

    form.reset();
  }

  sendToWhatsapp(){
    console.log("Whatsapp");
    let name = localStorage.getItem('customerName');
    let manualAddress = localStorage.getItem('manualAddress');
    let lat = this.customer.latitude;
    let lon = this.customer.longitude;
    let googleAddress = "https://www.google.com/maps/search/?api=1%26query="+lat+","+lon+"";
    let address = "";
    var order = '';
    this.manualAddress ? address = manualAddress : address = googleAddress;

    const getfPortionName = i => {

      let prt = this.objects2Print[i];
      let extraPotions = "";
      let dressings = "";

      if(prt.fExtraPortion){
        if ((prt[0].quantity > 0) || (prt[1].quantity > 0) || (prt[2].quantity > 0) || (prt[4].quantity > 0)){
          extraPotions = extraPotions + "Porciones Extras:" + "%0a";
          if(prt[0].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[0].quantity + " x " + prt[0].extraPortionName + "%0a"}
          if(prt[1].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[1].quantity + " x " + prt[1].extraPortionName + "%0a"}
          if(prt[2].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[2].quantity + " x " + prt[2].extraPortionName + "%0a"}
          if(prt[3].quantity > 0){ extraPotions = extraPotions + "%20%20%20%20" + prt[3].quantity + " x " + prt[3].extraPortionName + "%0a"}
        }
      }

      if(prt.fDressingsOrder.cebollaAsada ||
         prt.fDressingsOrder.chimichurri ||
         prt.fDressingsOrder.cilantro ||
         prt.fDressingsOrder.ketchup ||
         prt.fDressingsOrder.pinaHabanero ||
         prt.fDressingsOrder.quesoAmarillo ||
         prt.fDressingsOrder.ranch ||
         prt.fDressingsOrder.salsaBBQ ||
         prt.fDressingsOrder.salsaBuffalo ||
         prt.fDressingsOrder.salsaVerde ||
         prt.fDressingsOrder.tamarindoPicante){
          dressings = dressings + "Aderezos:" + "%0a"

          if(prt.fDressingsOrder.cebollaAsada){ dressings = dressings + "%20%20%20%20" + "Cebolla asada%0a" }
          if(prt.fDressingsOrder.chimichurri){ dressings = dressings + "%20%20%20%20" + "Chimichurri%0a" }
          if(prt.fDressingsOrder.cilantro){ dressings = dressings + "%20%20%20%20" + "Cilantro%0a" }
          if(prt.fDressingsOrder.ketchup){ dressings = dressings + "%20%20%20%20" + "Cilantro%0a" }
          if(prt.fDressingsOrder.pinaHabanero){ dressings = dressings + "%20%20%20%20" + "Piña Habanero%0a" }
          if(prt.fDressingsOrder.quesoAmarillo){ dressings = dressings + "%20%20%20%20" + "Queso Amarillo%0a" }
          if(prt.fDressingsOrder.ranch){ dressings = dressings + "%20%20%20%20" + "Ranch%0a" }
          if(prt.fDressingsOrder.salsaBBQ){ dressings = dressings + "%20%20%20%20" + "Salasa BBQ%0a" }
          if(prt.fDressingsOrder.salsaBuffalo){ dressings = dressings + "%20%20%20%20" + "Salsa Buffalo%0a" }
          if(prt.fDressingsOrder.salsaVerde){ dressings = dressings + "%20%20%20%20" + "Salsa Verde%0a" }
          if(prt.fDressingsOrder.tamarindoPicante){ dressings = dressings + "%20%20%20%20" + "Tamarindo Picante%0a" }
        }

      return "%0a" + "%2aOrden%2a" + "%0a" + "Porción: "+ prt.fPortion.name + "%0a" + extraPotions + dressings;
    }

    const forLoop = async _ => {

      console.log('Start')

      for (var i = 0; i<this.objects2Print.length; i++){
            order = order + await getfPortionName(i);
      }

      window.location.href = "https://api.whatsapp.com/send?phone=5214612543596&text=%2aNombre:%2a%20"+name+"%0a%2aDirección:%2a%20"+address+"%0a%0a%2aResumen%20del%20pedido:%2a%0a"+order;
      
      localStorage.clear();
      console.log('End');
    }

    forLoop(1);
  }

  changeStyle($event){
    this.hoverSendToWhatsappImg = $event.type == 'mouseover' ? 'hoverRequestOrder' : 'requestOrder';
  }
}