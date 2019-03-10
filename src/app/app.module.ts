import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { DatePipe } from '@angular/common';

import { MatFormFieldModule, MatInputModule , MatSelectModule,MatButtonModule ,  MatNativeDateModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { RequestsComponent } from './requests/requests.component';
import { WorkPlanComponent } from './work-plan/work-plan.component';

import { LogInComponent } from './log-in/log-in.component';
import { RegisterComponent } from './register/register.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './services/jwt-interceptor.service';
import { FormWizardModule } from 'angular2-wizard';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { AddRequestComponent } from './add-request/add-request.component';
import { SliderComponent } from './slider/slider.component';
import { EnterComponent } from './enter/enter.component';
import { UploadFileComponent } from './upload-file/upload-file.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    RequestsComponent,
    WorkPlanComponent,
    LogInComponent,
    RegisterComponent,
    MainPageComponent,
    AddRequestComponent,
    SliderComponent,
    EnterComponent,
    UploadFileComponent

  ],
  imports: [
    MatButtonModule,
    MatNativeDateModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    FormWizardModule,
    FormsModule
  ],
  providers: [
    DatePipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
