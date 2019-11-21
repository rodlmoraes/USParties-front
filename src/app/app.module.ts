import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterService } from './components/register/register.service';
import { LoginService } from './components/log-in/log-in.service';
import { AngularMaterialModule } from './angular-material.module';

import { ToastrModule } from 'ngx-toastr';
import { PartiesComponent } from './components/parties/parties.component';
import { CreatePartyComponent } from './components/parties/modal/create-party/create-party.component';
import { PostsComponent } from './components/posts/posts.component';
import { CreatePostComponent } from './components/posts/modal/create-post.component';
import { CreateEditionComponent } from './components/parties/modal/create-edition/create-edition.component';
import { PostsService } from './components/posts/posts.service';
import { PartiesService } from './components/parties/parties.service';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    PartiesComponent,
    CreatePartyComponent,
    CreateEditionComponent,
    PostsComponent,
    CreatePostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  providers: [RegisterService, LoginService, PostsService, PartiesService],
  entryComponents: [CreatePostComponent, CreatePartyComponent, CreateEditionComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
