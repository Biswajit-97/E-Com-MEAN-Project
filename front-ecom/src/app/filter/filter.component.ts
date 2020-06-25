import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
   categories : Category[] = []
   
   category = ''
  constructor(private categoryService : CategoryService ,
     private router :Router
    ) { }

  ngOnInit(): void {
    

    this.collectAllCategory();
  }


  categorySelected(category_id : string){
    console.log(category_id);
    
   this.router.navigate(['/shopnow'] ,
   {
    queryParams : {
       'category' : category_id
    }
   }) 
  
  }

  collectAllCategory(){
    this.categoryService.getAllCategories()
    .subscribe({
      next:(categories)=>{
        this.categories = categories
        console.log(categories);
        
      }, 
      error : (responce : HttpErrorResponse)=>{
        console.log(responce);
      }
    })
  }




    
    
  }





