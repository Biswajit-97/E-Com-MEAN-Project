import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductServices } from './product.service';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { FilterComponent } from './filter/filter.component'
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductStoreComponent } from './product-store/product-store.component';
import { ShopnowComponent } from './shopnow/shopnow.component';
import { ProductCardComponent } from './product-card/product-card.component';






@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainScreenComponent,
    LoginComponent,
    RegistrationComponent,
    ProductDetailsComponent,
    CartComponent,
    OrderComponent,
    FilterComponent,
    ProductStoreComponent,
    ShopnowComponent,
    ProductCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),
    NgbModule



  ],
  providers: [ProductServices],
  bootstrap: [AppComponent]
})
export class AppModule { }
