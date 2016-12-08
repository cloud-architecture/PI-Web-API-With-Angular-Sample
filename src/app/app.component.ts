import { Component } from '@angular/core';
import { PIWebAPIService } from './piwebapi.service';


export class ComboboxOption {
  value: boolean;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  requestMode = true;
  piServerName: string;
  piPointName: string;
  startTime: string;
  endTime: "*";
  interval: "1h";
  yesOrNoOptions: ComboboxOption[] = [{ "value": true, "name": "Yes" }, { "value": false, "name": "No" }];
  getSnap: ComboboxOption = this.yesOrNoOptions[0];
  getRec: ComboboxOption = this.yesOrNoOptions[0];
  getInt: ComboboxOption = this.yesOrNoOptions[0];
  piServerData: any;
  piServerExistsValue: boolean;
  piServerError: any;
  piPointData: any;
  piPointExistsValue: boolean;
  webId: string;
  snapshotData: any;
  snapshotError: any;
  recordedData: any;
  interpolatedData: any;
  recordedError: any;
  interpolatedError: any;
  piPointError: any;

  constructor(private piWebApiHttpService: PIWebAPIService) { }

  defaultValues(): void {
    this.piServerName = "PISERVERNAME";
    this.piPointName = "SINUSOID";
    this.startTime = "*-1d";
    this.endTime = "*";
    this.interval = "1h";
    this.getSnap = this.yesOrNoOptions[0];
    this.getRec = this.yesOrNoOptions[0];
    this.getInt = this.yesOrNoOptions[0];
  }

  //get data by making http calls
  getData(): void {
    //switch div to display the results
    this.requestMode = false;
    //all HTTP requests are done through the  piWebApiHttpService factory object
    this.piWebApiHttpService.validPIServerName(this.piServerName)
      .subscribe(res => {
        this.piServerData = res.json();
        this.piServerExistsValue = true;
      },
      error => {
        this.piServerError = error.json();
        this.piServerExistsValue = false;
      });


    this.piWebApiHttpService.validPIPointName(this.piServerName, this.piPointName).subscribe(res => {
      this.piPointData = res.json();
      this.piPointExistsValue = true;
      //in case of success, we will get the webId of the PI Point which will be used by other requests
      this.webId = res.json().WebId;
      this.piWebApiHttpService.getSnapshotValue(this.webId).subscribe(res => {
        this.snapshotData = res.json();
      }, error => {
        this.snapshotError = error.json();
      });
      //The following requests use the webId already stored
      this.piWebApiHttpService.getRecordedValues(this.webId, this.startTime, this.endTime).subscribe(res => {
        this.recordedData = res.json();
      }, error => {
        this.recordedError = error.json();
      });

      this.piWebApiHttpService.getInterpolatedValues(this.webId, this.startTime, this.endTime, this.interval).subscribe(res => {
        this.interpolatedData = res.json();
      }, error => {
        this.interpolatedError = error.json();
      });
    }, error => {
      this.piPointError = error.data;
      this.piPointExistsValue = false;
    });
  }
}