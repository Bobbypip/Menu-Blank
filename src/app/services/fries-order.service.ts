import { Injectable } from '@angular/core';
import { Portion } from '../models/portion';
import { ExtraPortion } from '../models/extraPortion';
import { FriesOrder } from '../models/friesOrder';
import { ExtraPortionOrderQuantity } from '../models/extraPortionOrderQuantity';

@Injectable({
  providedIn: 'root'
})
export class FriesOrderService {
  constructor() { 
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

  quantityOfEachExtraPortion(array: ExtraPortion[]): ExtraPortionOrderQuantity[]{
    let arrResult: ExtraPortionOrderQuantity[] = [];
    for (let extraPortion of this.getExtraPortions()){
      var quantity = array.map(i => i.name).filter(i => i == extraPortion.name).length;
      arrResult.push(new ExtraPortionOrderQuantity(quantity,extraPortion.name));
    }
    return arrResult;
  }

}
