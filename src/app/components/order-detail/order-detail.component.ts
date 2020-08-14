import { Component, OnInit } from '@angular/core';
import { FriesOrder } from '../../models/friesOrder';
import { ExtraPortionOrderQuantity } from '../../models/extraPortionOrderQuantity';
import { FriesOrderService } from '../../services/fries-order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [FriesOrderService]
})
export class OrderDetailComponent implements OnInit {
  private ordersArray: FriesOrder[];
  private eachExtraPortionOrderQuantity: Object[];

  constructor(
    private _friesOrderService: FriesOrderService
  ) { 
    this.ordersArray = [];
    this.eachExtraPortionOrderQuantity = [];
  }

  ngOnInit(): void {
    console.log(this._friesOrderService.getObjects2Print());
  }

}
