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
  public portions = this._friesOrderService.getPortions();
  public extraPortions = this._friesOrderService.getExtraPortions();

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
  }

  ngOnInit(): void {
    console.log(this.friesOrder);
    //console.log(this.dressingsOrder);
  }

  addOnePortion(){
    console.log("hiolka");
    console.log(this.friesOrder.fPortion);
    this.friesOrder.fExtraPortions.push(this.extraPortionOrder);
    //console.log(this.extraPortionsArr);
  }

  deleteOnePortion(){
    let pos = this.friesOrder.fExtraPortions.map(function(e) { return e.name; }).indexOf(this.extraPortionOrder.name);
    this.friesOrder.fExtraPortions.splice(pos, 1);
    //console.log(this.extraPortionsArr);
  }

  onSubmit(form){
    this._friesOrderService.addFriesOrder(this.friesOrder);
    console.log(this.friesOrder);
    //form.reset();
  }

  

  

  

}

