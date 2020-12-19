import { Component } from "@angular/core";
import { SharedService } from "./shared.service";

@Component({
  selector: "app-sibling1",
  template: `
    <p>
      Child-1:
      <input
        placeholder="Search text .."
        (input)="passData($event.target.value)"
      />
      <br/>    <br/>
      Selected Data: {{ selectedUser }}
    </p>
  `
})
export class SearchInputComponent {
  selectedUser: string = "";
  constructor(private shared: SharedService) {
    this.shared.passSelectedCast.subscribe(user => {
      console.log(user)
      this.selectedUser = user;
    });
  }

  passData(data) {
    this.shared.changeState(data);
  }
}
