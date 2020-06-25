import {Product} from './product.model';

import { Component, EventEmitter, Injectable} from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';


@Injectable()
export class ProductServices {
    [x: string]: any;
    productUrl = 'http://localhost:3006/api/productbycat'
    constructor(private http: HttpClient, private userService: UserService) { }
  
    getAllProducts(params) {
      let query = new URLSearchParams();
  
  
      if (params['category']) {
        query.append('category', params['category'])
      }
      console.log(query.toString());
  
  
      return this.http.get(`${this.productUrl}?${query.toString()}`
        )
        .pipe(
          map((result: { count: number, products: Product[] }) => {
            return result.products
          })
        )
  
    }
    getProduct()
    {
        return this.products.slice();
    }

    

}