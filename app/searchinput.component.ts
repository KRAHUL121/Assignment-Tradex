import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
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
      <br />
      <br />
      Selected Data: {{ selectedUser | async }}
    </p>
  `
})
export class SearchInputComponent implements OnInit {
  // Declarations
  selectedUser: Observable<string>;

  constructor(private shared: SharedService) {}

  // Init Call Backs :Hook
  ngOnInit() {
    this.selectedUser = this.shared.passSelectedCast;
  }

  // Pass Data to Subject
  passData(data) {
    this.shared.changeState(data);
  }
}
