import { Component, OnInit } from '@angular/core';
import { CartServices } from '../cart.service';
import { HttpClient } from '@angular/common/http';
import { NewOrderServices } from '../neworder.service';
import { Order } from '../order.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  [x: string]: any;

  order : Order[];
  constructor(private cartSer:CartServices,private http:HttpClient,private newOrde:NewOrderServices) { }

  ngOnInit(): void {
    
      this.http.get<{[key:string]:Order}>("http://localhost:3006/api/orders")
      .pipe(map(
        responseData => 
        {
          const postArray =[];
          for (const key in responseData)
          {
              if(responseData.hasOwnProperty(key))
              {
                  postArray.push({...responseData[key],id:key})
              }
          }
  
          //console.log(postArray);
          return postArray;
  
             
      })).subscribe(posts =>{
       //   console.log("array"+posts);
    
         this.order = posts;
       })
     
      ;
  
     
     
    }
  
  }
  

