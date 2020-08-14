import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { OrderComponent } from './components/order/order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';


const routes: Routes = [
  {path: '', component: OrderComponent},
  {path: 'detail', component: OrderDetailComponent},
  {path: '**', component: OrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
