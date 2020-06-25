import {Cart} from './cart.model';
import { Component, EventEmitter, Injectable} from '@angular/core';
import { Order } from './order.model';


@Injectable({
    providedIn: 'root',
  })
export class NewOrderServices
{
    deleteOrder() {
      throw new Error("Method not implemented.");
    }
    OrderChanged = new EventEmitter<Order[]>();
    order : Order[] =
    [

    ];


    getOrder()
    {
        return this.order.slice();
    }

 
    addToOrder(orderitems:Order)
      {
          this.order.push(orderitems);
          this.OrderChanged.emit(this.order.slice());
          alert("Your Order Is Placed SuccessFully");
      }

  
     /*  deleteOrder()
     {
         this.order = [];
    }
*/

}