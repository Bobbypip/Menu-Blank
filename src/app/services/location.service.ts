import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { Location } from '../models/location';
import { global } from './global';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private url: string;
  private apiKey: string;

  constructor(
    public _http: HttpClient
  ) { 
    this.url = global.url;
    this.apiKey = global.APIKey;
  }

  getLocation(): Location{

    var coords = new Location(0, 0, false, '');
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(showUbication,errorUbication);

      function showUbication (ubication) {
        const lat = ubication.coords.latitude;
        const lng = ubication.coords.longitude;
        coords.latitude = lat;
        coords.longitude = lng;
        coords.found = true;
      }
      function errorUbication (e){
        if(e.code == 1){
          alert("Por favor da permiso a tu ubicación, de lo contrario deberás introducir tu dirección manualmente.");
        }else{
          alert("No podemos acceder a tu ubicación, por favor introduce tu dirección en el formulario.");
        }
      }
    }

    return coords;
  }

  getAddress(lat: string, lon: string): Observable<any>{
    return this._http.get(this.url+'v1/revgeocode?at='+ lat + '%2C' + lon + '&lang=en-US&apiKey=' + this.apiKey);
  }
}
