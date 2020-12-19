import { Component } from "@angular/core";
import { SharedService } from "./shared.service";

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
          //
          <tr *ngFor="let row of userTable">
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
  userTable: UserData[] = [];
  actualData: UserData[] = [];
  searchtext = "";
  constructor(private shared: SharedService) {
    this.shared.castData.subscribe(user => {
      this.searchtext = user;
      this.searchProps();
    });
  }

  ngOnInit() {
    this.shared.getAllData().subscribe(data => {
      this.userTable = data.json();
      this.actualData = data.json();
    });
  }

  searchProps() {
    let findData = this.searchtext.toLowerCase();
    this.userTable = this.actualData.filter(ele => {
      if (
        ele["name"].toLowerCase().indexOf(findData) != -1 ||
        ele["username"].toLowerCase().indexOf(findData) != -1 ||
        ele["email"].toLowerCase().indexOf(findData) != -1
      )
        return ele;
    });
  }

  sendData(data) {
    this.shared.passtoSearch(data);
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
}
