import { Injectable } from '@angular/core';
import { Portion } from '../models/portion';
import { ExtraPortion } from '../models/extraPortion';
import { FriesOrder } from '../models/friesOrder';

@Injectable({
  providedIn: 'root'
})
export class FriesOrderService {
  private friesOrdersArr: FriesOrder[];
  constructor() { 
    this.friesOrdersArr = [];
  }

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

  getExtraPortions(): ExtraPortion[]{
    return [
      new ExtraPortion(10, "Tocino"),
      new ExtraPortion(10, "Pastor"),
      new ExtraPortion(10, "Boneless"),
      new ExtraPortion(15, "Arrachera")
    ];
  }

  addFriesOrder(friesOrder): void{
    this.friesOrdersArr.push(friesOrder);
    //console.log(this.friesOrdersArr);
  }

}
