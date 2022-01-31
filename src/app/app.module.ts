import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule, MatSpinner } from '@angular/material/progress-spinner';



import { Observable } from 'rxjs';


import {AppComponent} from './app.component';

import 'hammerjs';
import {MenuComponent} from './menu/menu.component';
import {DishdetailComponent} from '../app/menu/dishdetail/dishdetail.component';

import {DishService} from '../app/Service/dish.service';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {PromotionService} from './services/promotion.service';
import {LeaderService} from './services/leader.service';
import {LoginComponent} from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {baseURL} from '../app/menu/shared/baseurl';

import { MapType } from '@angular/compiler';


@NgModule({
  declarations: [
    AppComponent ,
    MenuComponent ,
    DishdetailComponent,
    HeaderComponent ,
    FooterComponent ,
    AboutComponent ,
    HomeComponent ,
    ContactComponent ,
    LoginComponent ,

  ] ,
  imports: [
    BrowserModule ,
    BrowserAnimationsModule ,
    FlexLayoutModule ,
    MatButtonModule ,
    MatCheckboxModule ,
    MatFormFieldModule ,
    MatInputModule ,
    MatToolbarModule ,
    MatListModule ,
    MatGridListModule ,
    MatCardModule ,
    MatDialogModule ,
    FlexLayoutModule ,
    AppRoutingModule ,
    FormsModule ,
    ReactiveFormsModule ,
    HttpClientModule,
    MatProgressSpinnerModule,
    Observable,
    MapType,

  ] ,
  entryComponents: [
    LoginComponent,

  ] ,
  providers: [
    DishService ,
    PromotionService ,
    LeaderService ,

    {provide: 'BaseURL' , useValue: baseURL}
  ] ,
  bootstrap: [AppComponent]
})
export class AppModule {
}
