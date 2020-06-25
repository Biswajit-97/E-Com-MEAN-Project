import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductServices } from '../product.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Params, ParamMap } from '@angular/router';

@Component({
  selector: 'app-shopnow',
  templateUrl: './shopnow.component.html',
  styleUrls: ['./shopnow.component.css']
})
export class ShopnowComponent implements OnInit {

    
  products : Product[];
 
  constructor(private productServi :ProductServices,private http:HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe({
      next : (paramMap : ParamMap)=>{
        let categoryId = paramMap.get('category');
        let min = paramMap.get('min');
        let max = paramMap.get('max');
        console.log(categoryId);
        this.collectProducts({category : categoryId , min , max} )    
      }
    })
    


    this.http.get<{[key:string]:Product}>("http://localhost:3006/api/product")
    .pipe(map(responseData => {
        const postArray =[];
        for (const key in responseData)
        {
            if(responseData.hasOwnProperty(key))
            {
                postArray.push({...responseData[key],id:key})
            }
        }

        return postArray;

           
    })).subscribe(posts =>{
        console.log("array"+posts);
  
       this.products = posts;
     })
   
    ;   


  }


  
  collectProducts(params){
    this.productServi.getAllProducts(params)
    .subscribe({
      next : (products)=>{
        this.products = products
        console.log(this.products);
        
      } , 
      error: (error)=>{
        console.log(error);
      }
    })
    }




    
}





