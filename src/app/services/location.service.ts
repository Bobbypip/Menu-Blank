import { Injectable } from '@angular/core';
import { Coords } from '../models/coords';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getLocation(): Coords{

    var coords = new Coords(0, 0, false);
    if (navigator.geolocation) {

      navigator.geolocation.getCurrentPosition(showUbication,errorUbication);

      function showUbication (ubication) {
        const lng = ubication.coords.longitude;
        const lat = ubication.coords.latitude;
        coords.longitude = lng;
        coords.latitude = lat;
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
}
