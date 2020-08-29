import { Injectable } from '@angular/core';
import { Portion } from '../models/portion';
import { ExtraPortion } from '../models/extraPortion';
import { FriesOrder } from '../models/friesOrder';
import { DressingsOrder } from '../models/dessingsOrder';
import { ExtraPortionOrderQuantity } from '../models/extraPortionOrderQuantity';

@Injectable({
  providedIn: 'root'
})
export class FriesOrderService {
  constructor() { 
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

  getArrayOfQuantityOfEachExtraPortion(): any[]{
    let ordersArray = this.getLocalStorageData();
    let eachExtraPortionOrderQuantity = [];

    for(let item in ordersArray){
      let friesOrderObject = ordersArray[item];
      let eachQuantityOfEachExtraPortion = this.quantityOfEachExtraPortion(friesOrderObject.fExtraPortions);
      let arrayAsObjectOfEachquantityOfEachExtraPortion = Object.assign({}, eachQuantityOfEachExtraPortion);

      eachExtraPortionOrderQuantity.push(arrayAsObjectOfEachquantityOfEachExtraPortion);
    }

    return eachExtraPortionOrderQuantity;
  }

  getPriceOfFriesOrder(friesOrder: FriesOrder): number{
    let price: number = 0;
    price += friesOrder.fPortion.price;

    if(friesOrder.fExtraPortion){
      for(let priceOfExtraOrder of friesOrder.fExtraPortions){
        price += priceOfExtraOrder.price;
      }
    }

    return price;
  }

  getLocalStorageData(): FriesOrder[]{
    let order: FriesOrder = new FriesOrder(
      0,
      new Portion(0,''),
      false,
      [],
      new DressingsOrder(
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ),
      0
    );
    let orderArray: FriesOrder[] = [];
    let lenght = localStorage.length;

    for(let i = 0; i < lenght; i++){
      let key = localStorage.key(i);

      if((key != "primaryKey") && 
         (key != "manualAddress") &&
         (key != "customerName")){
        orderArray.push( JSON.parse(localStorage.getItem(localStorage.key(i))) );
      }
    }

    return orderArray;
  }

  getCompleteOrderPrice(): number{
    let orderArray: FriesOrder[] = this.getLocalStorageData();
    let totalPrice:number = 0;

    for(let i in orderArray){
      totalPrice += orderArray[i].fPrice;
    }

    return totalPrice;
  }

  getObjects2Print(): any[]{
    let getLocalStorageData = this.getLocalStorageData();
    let getArrayOfQuantityOfEachExtraPortion = this.getArrayOfQuantityOfEachExtraPortion();
    let arrayOfOrderObjects = [];

    let lenght =  getLocalStorageData.length;

    for (let i = 0; i < lenght; i++ ){
      let object = Object.assign(getLocalStorageData[i], getArrayOfQuantityOfEachExtraPortion[i]);

      arrayOfOrderObjects.push(object);
    }

    return arrayOfOrderObjects;
  }

  setId(): number{
    let actual;

    if(localStorage.getItem("primaryKey") === null){
      localStorage.setItem("primaryKey","1");

      return 1;
    }

    actual = localStorage.getItem("primaryKey");
    actual = parseInt(actual);
    actual++;
    
    localStorage.setItem("primaryKey", actual.toString());

    return actual;
  }

}
