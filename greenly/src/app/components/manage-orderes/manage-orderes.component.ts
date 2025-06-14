import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { ToastrService } from 'ngx-toastr';
import { IOrder } from '../../core/interfeces/i-order';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-manage-orderes',
  standalone: true,
  imports: [NgClass, DatePipe, CurrencyPipe],
  templateUrl: './manage-orderes.component.html',
  styleUrl: './manage-orderes.component.css',
})
export class ManageOrderesComponent implements OnInit {
  constructor(
    private _OrdersService: OrdersService,
    private _ToastrService: ToastrService
  ) {}

  ordersData!: IOrder[];

  ngOnInit(): void {
    this.getAllOrders()
  }

  getAllOrders(): void {
    this._OrdersService.getAllOrders().subscribe({
      next: (res) => {
        console.log(res);
        this.ordersData = res.orders;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateOrderStatus(orderId: string, status: string): void{
    this._OrdersService.updateOrderStatus(orderId, status).subscribe({
      next: (res)=>{
        console.log(res)
        this.getAllOrders()
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }
}
