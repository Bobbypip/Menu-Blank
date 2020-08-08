import { Injectable } from '@angular/core';
import { Portion } from '../models/portion';

@Injectable({
  providedIn: 'root'
})
export class FriesOrderService {

  constructor() { }

  getTexto(): string {
    return "Hola bb";
  }

  getPortions(): Portion[]{
    return [
      new Portion(55,"Solo papas"),
      new Portion(70, "Tocino"),
      new Portion(70, "Pastor"),
      new Portion(70, "Boneless"),
      new Portion(80, "Arrachera")
    ];
  }

  getExtraPortions(): string[]{
    return ["Tocino", "Pastor", "Boneless", "Arrachera"];
  }
}
