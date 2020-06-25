import { Component, OnInit, Injectable } from '@angular/core';
import { Cart } from '../cart.model';
import { CartServices } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { Order } from '../order.model';
import {OrderServices, orderInfo, ProductInfo} from '../order.service';
import { from } from 'rxjs';
import { NewOrderServices } from '../neworder.service';
import { ModalModule, BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class CartComponent implements OnInit {
  [x: string]: any;

  modalRef: BsModalRef

  constructor(private cartSer:CartServices,private http:HttpClient,private newOrde:NewOrderServices) { }

  cart : Cart[] ;
  order : Order[];

  final_total :number =0;
  ngOnInit(): void {

   //console.log( this.cartSer.getcart());
    this.cart = this.cartSer.getcart();

    for(let i of this.cart)
    {
      this.final_total = this.final_total + i.product_total;
    }

  }
  deleteCart(index:number)
  {
    this.cartSer.deleteCart(index);
    this.cart = this.cartSer.getcart();
  }



  placeOrder2()
  {

    for(let i of this.cart)
    {
    const items =   new Order(i.product_id,i.product_name,i.product_count,i.product_price);
      this.newOrde.addToOrder(items);
    }

     let products2:Order[];

    products2 = this.newOrde.getOrder();
  let  amount = this.final_total;
  let  address = "pune";
  let    user = "5ec43ca535a864729c349517";

  let postData =
  {
    products : products2,
    amount : amount,
    address :address,
    user : user


  }
    // console.log(products2);

    // console.log(postData);

    this.http.post('http://localhost:3006/api/order/create',postData).subscribe(responseData => {
        console.log(responseData);


        this.deleteOrder();

        alert("Order is created !!!!");
      });

  }
  deleteOrder() {
    throw new Error("Method not implemented.");
  }
  
  openModal(form){
    this.modalRef = this.modalService.show(form ,
      {
        animated : true ,
        class : 'modal-lg'
      })
  }


}

