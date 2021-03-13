import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input'

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { SettingsComponent } from './components/settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { CurrentConditionsComponent } from './components/current-conditions/current-conditions.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TopbarComponent,
    SettingsComponent,
    CurrentConditionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    //Angular Material
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
