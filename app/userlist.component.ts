import { Component, OnInit, OnDestroy } from "@angular/core";
import { SharedService } from "./shared.service";
import { IData } from "./data.interface";

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
            <th scope="col">phone</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of userTable; trackBy: trackIndex">
            <th scope="row">{{ row.id }}</th>
            <td (click)="sendData(row.name)">{{ row.name }}</td>
            <td>{{ row.username }}</td>
            <td>{{ row.email }}</td>
            <td>{{ row.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UserListComponent implements OnInit, OnDestroy {
  // Declarations
  userTable: IData[] = [];
  actualData: IData[] = [];
  searchtext: string = "";

  constructor(private shared: SharedService) {}

  ngOnInit() {
    // Data Subscribed from service without async pipe
    this.shared.getAllData().subscribe(
      data => {
        this.userTable = data;
        this.actualData = this.userTable;
      },
      error => {
        console.error(error);
      }
    );
    this.shared.castData.subscribe(
      res => {
        this.searchtext = res;
        this.searchProps();
      },
      error => {
        console.error(error);
      }
    );
  }

  searchProps() {
    const findData = ["name", "username", "email"];
    this.userTable = this.actualData.filter(ele =>
      findData.some(
        subele =>
          ele[subele].toLowerCase().indexOf(this.searchtext.toLowerCase()) != -1
      )
    );
  }

  // Data Transfer : Component Interaction
  sendData(data) {
    this.shared.passtoSearch(data);
  }

  // Single Row Render
  trackIndex(index, row) {
    return row ? row.id : undefined;
  }

  // unsubscribe Subsciptions
  ngOnDestroy() {
    this.shared
      .getAllData()
      .subscribe()
      .unsubscribe();
    this.shared.castData.subscribe().unsubscribe();
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
