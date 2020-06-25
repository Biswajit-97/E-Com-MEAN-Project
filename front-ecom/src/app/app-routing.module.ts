import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ShopnowComponent } from './shopnow/shopnow.component'




const appRoutes:Routes =[
    { path: '', redirectTo: '/main', pathMatch: 'full' },
    {path:'main',component:MainScreenComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegistrationComponent},
    {path:'product-detail/:id',component:ProductDetailsComponent},
    {path:'cart',component:CartComponent},
    {path: 'order', component:OrderComponent},
    {path: 'shopnow', component:ShopnowComponent}
    
];


@NgModule({
    imports : [RouterModule.forRoot(appRoutes)],
    exports :[RouterModule]
})

export class AppRoutingModule{

}
