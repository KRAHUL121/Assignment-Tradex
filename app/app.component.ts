import { Component } from "@angular/core";
import { SharedService } from "./shared.service";

@Component({
  selector: "app-root",
  template: `
    <div style=" display: flex;">
      <app-sibling1></app-sibling1>
      <app-sibling2></app-sibling2>
    </div>
  `,
  providers: [SharedService]
})
export class AppComponent {}
