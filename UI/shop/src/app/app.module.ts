import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { EditsComponent } from './edits/edits.component';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';

@NgModule({
  declarations: [AppComponent, EditsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    HomeModule,
    FormsModule,
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
