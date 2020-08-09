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
  public extraPortion: boolean;
  public extraPortionOrder: ExtraPortion;
  public extraPortionsArr: ExtraPortion[];
  public dressingsOrder: DressingsOrder;
  public portions = this._friesOrderService.getPortions();
  public extraPortions = this._friesOrderService.getExtraPortions();

  constructor(
    private _friesOrderService: FriesOrderService
  ) { 
    this.portionOrder = new Portion(0,'');
    this.extraPortion = false;
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
      this.portionOrder,
      this.extraPortion,
      this.extraPortionsArr,
      this.dressingsOrder,
      0
    );
  }

  ngOnInit(): void {
    console.log(this.friesOrder);
    //console.log(this.dressingsOrder);
  }

  onChangePortion(){
    //console.log("pepe");
    this.friesOrder.fPortion = this.portionOrder;
  }

  addOnePortion(){
    console.log("hiolka");
    console.log(this.friesOrder.fPortion);
    this.extraPortionsArr.push(this.extraPortionOrder);
    //console.log(this.extraPortionsArr);
  }

  deleteOnePortion(){
    let pos = this.extraPortionsArr.map(function(e) { return e.name; }).indexOf(this.extraPortionOrder.name);
    this.extraPortionsArr.splice(pos, 1);
    //console.log(this.extraPortionsArr);
  }

  onSubmit(form){
    console.log(this.friesOrder);
    //form.reset();
  }

  

  

  

}

