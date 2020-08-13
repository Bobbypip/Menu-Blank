import { Component, OnInit } from '@angular/core';
import { FriesOrder } from '../../models/friesOrder';
import { Portion } from '../../models/portion';
import { ExtraPortion } from '../../models/extraPortion';
import { DressingsOrder } from '../../models/dessingsOrder';
import { FriesOrderService } from '../../services/fries-order.service';
import { ExtraPortionOrderQuantity } from '../../models/extraPortionOrderQuantity';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [FriesOrderService]
})
export class OrderComponent implements OnInit {
  public friesOrder: FriesOrder;
  public extraPortionOrder: ExtraPortion;
  public portions = this._friesOrderService.getPortions();
  public extraPortions = this._friesOrderService.getExtraPortions();
  public id: number;
  public extraPortionOrdersQuantity: ExtraPortionOrderQuantity[];

  constructor(
    private _friesOrderService: FriesOrderService
  ) { 
    // Set initial values
    this.friesOrder = new FriesOrder(
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
    this.extraPortionOrder = new ExtraPortion(0,'');
    this.id = 0;
    this.extraPortionOrdersQuantity = [];
  }

  ngOnInit(): void {
    if(typeof(Storage) != 'undefined'){
    }else{
      alert("Pruebe en otro navegador");
    }
  }

  onChangePortion(){
    this.friesOrder.fPrice = this._friesOrderService.getPriceOfFriesOrder(this.friesOrder);
  }

  onChangeBooleanExtraPortion(){
    this.friesOrder.fPrice = this._friesOrderService.getPriceOfFriesOrder(this.friesOrder);
  }

  addOnePortion(){
    if(this.extraPortionOrder.name!=null){
      this.friesOrder.fExtraPortions.push(this.extraPortionOrder);
      this.extraPortionOrdersQuantity = this._friesOrderService.quantityOfEachExtraPortion(this.friesOrder.fExtraPortions);
    }
    
    // Update the order price
    this.friesOrder.fPrice = this._friesOrderService.getPriceOfFriesOrder(this.friesOrder);
  }

  deleteOnePortion(){
    let posQuantity = this.extraPortionOrdersQuantity.map(i => i.extraPortionName).indexOf(this.extraPortionOrder.name);
    if(this.extraPortionOrdersQuantity[posQuantity].quantity > 0){
      let pos = this.friesOrder.fExtraPortions.map(i => i.name).indexOf(this.extraPortionOrder.name);
      this.friesOrder.fExtraPortions.splice(pos, 1);
      this.extraPortionOrdersQuantity = this._friesOrderService.quantityOfEachExtraPortion(this.friesOrder.fExtraPortions);
    }

    // Update the order price
    this.friesOrder.fPrice = this._friesOrderService.getPriceOfFriesOrder(this.friesOrder);
  }

  onSubmit(form){
    // Update the order price
    this.friesOrder.fPrice = this._friesOrderService.getPriceOfFriesOrder(this.friesOrder);

    // Add the Id to the order
    this.friesOrder.fiD = this.id;

    // Save the order into the Local Storage
    localStorage.setItem(this.id.toString(), JSON.stringify(this.friesOrder));
    this.id++;

    form.reset();

    // Reset extraPortionOrdersQuantity
    for(let item of this.extraPortionOrdersQuantity){
      item.quantity = 0;
    }

    this.friesOrder = new FriesOrder(
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
    this.extraPortionOrder = new ExtraPortion(0,'');
    this.extraPortionOrdersQuantity = [];
  }
}

