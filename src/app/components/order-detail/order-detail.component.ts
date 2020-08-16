import { Component, OnInit, DoCheck } from '@angular/core';
import { FriesOrderService } from '../../services/fries-order.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  providers: [FriesOrderService]
})
export class OrderDetailComponent implements OnInit, DoCheck {
  public objects2Print = [];

  constructor(
    private _friesOrderService: FriesOrderService
  ) {
    this.objects2Print = this._friesOrderService.getObjects2Print();
  }
  ngDoCheck(): void {
    this.objects2Print = this._friesOrderService.getObjects2Print();
  }

  ngOnInit(): void {
    console.log(this.objects2Print);
  }

  deleteOrder(id){
    console.log(id);
    localStorage.removeItem(id.toString());
  }
}
