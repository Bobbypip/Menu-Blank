import { Component, OnInit } from '@angular/core';
import { FriesOrder } from '../../models/friesOrder';
import { Portion } from '../../models/portion';
import { ExtraPortionSpecial } from '../../models/extraPortionSpecial';
import { ExtraPortionPremium } from '../../models/extraPortionPremium';
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
  public extraPortionEspecialArr: ExtraPortionSpecial[];
  public extraPortionPremiumArr: ExtraPortionPremium[];
  public dressingsOrder: DressingsOrder;
  public portionSelect: string = "";
  public portions = this._friesOrderService.getPortions();
  public extraPortions = this._friesOrderService.getExtraPortions();

  constructor(
    private _friesOrderService: FriesOrderService
  ) { 
    this.portionOrder = new Portion(0,'');
    this.extraPortionEspecialArr = [];
    this.extraPortionPremiumArr = [];
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
      false,
      this.extraPortionEspecialArr,
      this.extraPortionPremiumArr,
      this.dressingsOrder,
      0
    ); 
  }

  ngOnInit(): void {
    console.log(this._friesOrderService.getPortions());
  }

  onSubmit(form){
  }

  addPortion(){
    console.log("hiolka");
    console.log(this.friesOrder.dressingsOrder.cilantro);
    console.log(this.friesOrder.dressingsOrder.ranch);
  }
}
