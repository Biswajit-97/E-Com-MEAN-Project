import {Cart} from './cart.model';
import { Component, EventEmitter} from '@angular/core';
import { Order } from './order.model';
import { HttpClient } from '@angular/common/http';



export class OrderServices
{
    OrderChanged = new EventEmitter<Order[]>();
    order : Order[];
     orderPlaceUrl = "http://localhost:3006/api/order/create"
    constructor(private http: HttpClient){}

    getOrder()
    {
        return this.order.slice();
    }

 
    addToOrder(orderitems:Order)
      {
          this.order.push(orderitems);
          this.OrderChanged.emit(this.order.slice());

      }

    deleteOrder(index:number)
    {
        this.order.splice(index,1);
    }

  
      placeOrder(orderInfo: orderInfo){
           
       return this.http.post(this.orderPlaceUrl, orderInfo )

      }

}

export interface orderInfo {
    products: ProductInfo;
    firstName: string;
    lastName: string;
    amount: number;
    address: string;
    payment: string;
    user: string;
  }
  
 export interface ProductInfo  {
    product: string;
    name: string;
    count: number;
    price: number;
  }
  