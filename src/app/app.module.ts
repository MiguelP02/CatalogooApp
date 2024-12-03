import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';

import { provideHttpClient, withFetch } from '@angular/common/http';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
