// Modules
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";

// Components
import { AppComponent } from "./app.component";
import { SearchInputComponent } from "./searchinput.component";
import { UserListComponent } from "./userlist.component";

// Services
import { SharedService } from "./shared.service";

// Declarations
const _compDec = [AppComponent, SearchInputComponent, UserListComponent];
const _moduleDec = [BrowserModule, HttpModule];
const _serviceDec = [SharedService];

@NgModule({
  declarations: [_compDec],
  imports: [_moduleDec],
  providers: [_serviceDec],
  bootstrap: [AppComponent]
})
export class AppModule {}
