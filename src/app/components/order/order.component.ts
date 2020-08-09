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
  public portionOrder: Portion;
  public extraPortionOrder: ExtraPortion;
  public extraPortionsArr: ExtraPortion[];
  public dressingsOrder: DressingsOrder;
  public portions = this._friesOrderService.getPortions();
  public extraPortions = this._friesOrderService.getExtraPortions();

  constructor(
    private _friesOrderService: FriesOrderService
  ) { 
    this.portionOrder = new Portion(0,'');
    this.extraPortionOrder = new ExtraPortion(0,'');
    this.extraPortionsArr = [];
    this.dressingsOrder = new DressingsOrder(
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
    );

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
    console.log(this.friesOrder.fPrice);
    //console.log(this.dressingsOrder);
  }

  onSubmit(form){
    console.log(this.friesOrder);
    //form.reset();
  }

  addOnePortion(){
    console.log("hiolka");
    this.extraPortionsArr.push(this.extraPortionOrder);
    //console.log(this.extraPortionsArr);
  }

  deleteOnePortion(){
    let pos = this.extraPortionsArr.map(function(e) { return e.name; }).indexOf(this.extraPortionOrder.name);
    this.extraPortionsArr.splice(pos, 1);
    //console.log(this.extraPortionsArr);
  }

}

