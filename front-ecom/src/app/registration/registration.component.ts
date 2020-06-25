import { Component, OnInit, Injectable } from '@angular/core';
import { User } from '../user.model';
import { ProductServices } from '../product.service';
import { Product } from '../product.model';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class RegistrationComponent implements OnInit {
  [x: string]: any;

  user : User;
  constructor(private productServi :ProductServices,private http:HttpClient) { }

  ngOnInit(): void {
  }

  onCreatePost(postData: { name: string; lastname: string, email: string; password: string, address: string; })
  {

    console.log(postData);

    this.http .post('http://localhost:3006/api/signup',postData).subscribe(responseData => {
        console.log(responseData);
        alert("welcome account is created");
        this.router.navigateByUrl('/login');

      });

  }

}
