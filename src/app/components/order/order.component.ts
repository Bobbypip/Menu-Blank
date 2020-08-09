import { Component, OnInit } from '@angular/core';
import { FriesOrder } from '../../models/friesOrder';
import { Portion } from '../../models/portion';
import { ExtraPortion } from '../../models/extraPortion';
import { DressingsOrder } from '../../models/dessingsOrder';
import { FriesOrderService } from '../../services/fries-order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [FriesOrderService]
})
export class OrderComponent implements OnInit {
  public friesOrder: FriesOrder;
  public extraPortionOrder: ExtraPortion;
  public orders: FriesOrder[];
  public portions = this._friesOrderService.getPortions();
  public extraPortions = this._friesOrderService.getExtraPortions();
  public i: number = 0;

  constructor(
    private _friesOrderService: FriesOrderService
  ) { 
    // Set initial values for friesOrder
    this.friesOrder = new FriesOrder(
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
    this.orders = [];
  }

  ngOnInit(): void {
    console.log(this.friesOrder);
    if(typeof(Storage) != 'undefined'){
      console.log("Localstorage disponible");
    }else{
      console.log("INcomp")
    }
  }

  addOnePortion(){
    console.log("hiolka");
    if(this.extraPortionOrder.name!=null){
      this.friesOrder.fExtraPortions.push(this.extraPortionOrder);
    }
    //console.log(this.extraPortionsArr);
  }

  deleteOnePortion(){
    let pos = this.friesOrder.fExtraPortions.map(function(e) { return e.name; }).indexOf(this.extraPortionOrder.name);
    this.friesOrder.fExtraPortions.splice(pos, 1);
    //console.log(this.extraPortionsArr);
  }

  onSubmit(form){
    //this._friesOrderService.addFriesOrder(this.friesOrder);
    localStorage.setItem(this.i.toString(), JSON.stringify(this.friesOrder));
    this.i++;
    //console.log(this.orders);
    form.reset();
    this.friesOrder.fDressingsOrder.cebollaAsada = false;
    this.friesOrder.fDressingsOrder.chimichurri = false;
    this.friesOrder.fDressingsOrder.cilantro = false;
    this.friesOrder.fDressingsOrder.ketchup = false;
    this.friesOrder.fDressingsOrder.pinaHabanero = false;
    this.friesOrder.fDressingsOrder.quesoAmarillo = false;
    this.friesOrder.fDressingsOrder.ranch = false;
    this.friesOrder.fDressingsOrder.salsaBBQ = false;
    this.friesOrder.fDressingsOrder.salsaBuffalo = false;
    this.friesOrder.fDressingsOrder.salsaVerde = false;
    this.friesOrder.fDressingsOrder.tamarindoPicante = false;
  }
}

