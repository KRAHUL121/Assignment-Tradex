import { Component } from "@angular/core";
import { SharedService } from "./shared.service";
import { IData } from "./data.interface";
import { Observable } from "rxjs";
@Component({
  selector: "app-sibling2",
  template: `
    <div style="border-left :1px solid grey;padding-left:20px;">
      <h4>
        <b>Input Text: {{ searchtext }}</b>
      </h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of (userTable | async); trackBy: trackIndex">
            <th scope="row">{{ row.id }}</th>
            <td (click)="sendData(row.name)">{{ row.name }}</td>
            <td>{{ row.username }}</td>
            <td>{{ row.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UserListComponent {
  userTable: Observable<IData[]>;
  actualData: any;
  searchtext: string = "";

  constructor(private shared: SharedService) {}

  ngOnInit() {
    this.userTable = this.shared.getAllData();
    this.actualData = this.userTable;
  }

  searchProps() {
    let findData = this.searchtext.toLowerCase();
    this.userTable = this.actualData.filter(ele => {
      ["name", "username", "email"].map(
        subele => subele.toLowerCase().indexOf(findData) != -1
      );
      return ele;
    });
  }

  sendData(data) {
    this.shared.passtoSearch(data);
  }
  trackIndex(index, row) {
    return row ? row.id : undefined;
  }
}

class UserData {
  "id": number;
  "name": string;
  "username": string;
  "email": string;
  "address": {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  "phone": string;
  "website": string;
  "company": {
    name: string;
    catchPhrase: string;
    bs: string;
  };

  ngOnDestroy() {}
}
