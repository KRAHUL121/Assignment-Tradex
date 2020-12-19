import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { SearchInputComponent } from './searchinput.component';
import { UserListComponent } from './userlist.component';
import { SharedService } from './shared.service';

@NgModule({
  declarations: [ 
    AppComponent,
    SearchInputComponent,
    UserListComponent 
  ],
  imports: [ BrowserModule ,HttpModule],
  providers: [SharedService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
