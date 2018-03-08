import { Component } from '@angular/core';
import { PIWebAPIService, PIItemsStreamValues, PIPoint, PITimedValue, PIStreamValues, PIElement, PIAttribute, PIDataServer } from 'angular-piwebapi';


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
  requestMode = true;
  piServerName: string;
  piPointName: string;
  startTime: string;
  endTime: '*';
  interval: '1h';
  yesOrNoOptions: ComboboxOption[] = [{ 'value': true, 'name': 'Yes' }, { 'value': false, 'name': 'No' }];
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
    this.piServerName = 'PISRV1';
    this.piPointName = 'SINUSOID';
    this.startTime = '*-1d';
    this.endTime = '*';
    this.interval = '1h';
    this.getSnap = this.yesOrNoOptions[0];
    this.getRec = this.yesOrNoOptions[0];
    this.getInt = this.yesOrNoOptions[0];
  }
  
    // get data by making http calls
  startTest(): void {
	//debuggerwebapiuser !try3.14webapi!
	this.piWebApiHttpService.configureInstance("https://devdata.osisoft.com/piwebapi/", false, "webapiuser", "password");
	this.piWebApiHttpService.home.get().subscribe(res => {
        console.log(res);
    }, error => {
        console.log(error.json());
    });
    this.piWebApiHttpService.dataServer.getByPath('\\\\MARC-PI2016').subscribe(res => {
        console.log(res);
		var pointName = "SINUSOID_TEST74" + Math.trunc(100000*Math.random());
        var newPoint = new PIPoint(null, null, pointName, null, "Test PI Point for AngularJS PI Web API Client", "classic", "float32", null, null, null, false);    
        this.piWebApiHttpService.dataServer.createPoint(res.WebId, newPoint).subscribe(res => {
            console.log(res);
        }, error => {
            console.log(error.json());
        }); 
    }, error => {
        console.log(error.json());
    });


    this.piWebApiHttpService.point.getByPath("\\\\MARC-PI2016\\sinusoid").subscribe(res => {
        console.log(res);
    }, error => {
        console.log(error.json());
    });


    var point1webId = "P0QuorgJ0MskeiLb6TmEmH5gAQAAAATUFSQy1QSTIwMTZcU0lOVVNPSUQ";
    var point2webId = "P0QuorgJ0MskeiLb6TmEmH5gAgAAAATUFSQy1QSTIwMTZcU0lOVVNPSURV";
    var point3webId = "P0QuorgJ0MskeiLb6TmEmH5g9AQAAATUFSQy1QSTIwMTZcQ0RUMTU4";


    var webIds = []
    webIds.push(point1webId);
    webIds.push(point2webId);
    webIds.push(point3webId);
    this.piWebApiHttpService.streamSet.getRecordedAdHoc(webIds, null, "*", null, true, 1000, null, null, null, "*-3d", null).subscribe(res => {
        console.log(res);
    }, error => {
        console.log(error.json());
    });

    let streamValuesItems : PIItemsStreamValues = new PIItemsStreamValues()
    let streamValue1 : PIStreamValues = new PIStreamValues()
    let streamValue2 : PIStreamValues = new PIStreamValues()
    let streamValue3 : PIStreamValues = new PIStreamValues()

    let value1 : PITimedValue = new PITimedValue()
    let value2 : PITimedValue = new PITimedValue()
    let value3 : PITimedValue = new PITimedValue()
    let value4 : PITimedValue = new PITimedValue()
    let value5 : PITimedValue = new PITimedValue()
    let value6 : PITimedValue = new PITimedValue()

    value1.Value = 2
    value1.Timestamp = "*-1d"
    value2.Value = 3
    value2.Timestamp = "*-2d"
    value3.Value = 4
    value3.Timestamp = "*-1d"
    value4.Value = 5
    value4.Timestamp = "*-2d"
    value5.Value = 6
    value5.Timestamp = "*-1d"
    value6.Value = 7
    value6.Timestamp = "*-2d"

    streamValue1.WebId = point1webId
    streamValue2.WebId = point2webId
    streamValue3.WebId = point3webId

    var values1 = [];
    values1.push(value1)
    values1.push(value2)
    streamValue1.Items = values1

    var values2 = [];
    values2.push(value3)
    values2.push(value4)
    streamValue2.Items = values2

    var values3 = [];
    values3.push(value5)
    values3.push(value6)
    streamValue3.Items = values3

    var streamValues = []
    streamValues.push(streamValue1)
    streamValues.push(streamValue2)
    streamValues.push(streamValue3)
    this.piWebApiHttpService.streamSet.updateValuesAdHoc(streamValues, null, null).subscribe(res => {
        console.log(res);
    }, error => {
        console.log(error.json());
    });
	
	var pirequest = {};
    pirequest["4"] = {
        "Method": "GET",
        "Resource": "https://marc-web-sql.marc.net/piwebapi/points?path=\\\\MARC-PI2016\\sinusoid",
        "Headers": {
            "Cache-Control": "no-cache"
        }
    };
    pirequest["5"] = {
        "Method": "GET",
        "Resource": "https://marc-web-sql.marc.net/piwebapi/points?path=\\\\MARC-PI2016\\cdt158",
        "Headers": {
            "Cache-Control": "no-cache"
        }
    };
    pirequest["6"] = {
        "Method": "GET",
        "Resource": "https://marc-web-sql.marc.net/piwebapi/streamsets/value?webid={0}&webid={1}",
        "Parameters": [
            "$.4.Content.WebId",
            "$.5.Content.WebId"
        ],
        "ParentIds": [
            "4",
            "5"
        ]
    };
    this.piWebApiHttpService.batch.execute(pirequest).subscribe(res => {
        console.log(res);
    }, error => {
        console.log(error.json());
    });
  }

  // get data by making http calls
  getData(): void {
    this.piWebApiHttpService.configureInstance("https://devdata.osisoft.com/piwebapi", false, "webapiuser", "!try3.14webapi!");

    // switch div to display the results
    this.requestMode = false;
    // all HTTP requests are done through the  piWebApiHttpService factory object
    this.piWebApiHttpService.dataServer.getByPath('\\\\' + this.piServerName)  
      .subscribe(res => {
        this.piServerData = res;
        this.piServerExistsValue = true;
      },
      error => {
        this.piServerError = error;
        this.piServerExistsValue = false;
      });


      this.piWebApiHttpService.point.getByPath('\\\\' + this.piServerName + '\\' + this.piPointName, null, null).subscribe(res => {
        this.piPointData = res
        this.piPointExistsValue = true
        //in case of success, we will get the webId of the PI Point which will be used by other requests
        this.webId = res.WebId;
        this.piWebApiHttpService.stream.getValue(this.webId).subscribe(res => {
            //Response of the snapshot is stored on the snapshotData
            this.snapshotData = res
        }, error => {
            this.snapshotError = error

        });

        this.piWebApiHttpService.stream.getRecorded(this.webId, null, null, this.endTime, null, null, null, null, this.startTime).subscribe(res => {
            this.recordedData = res
          }, error => {
            this.recordedError = error
        });
        this.piWebApiHttpService.stream.getInterpolated(this.webId, null, this.endTime, null, null, this.interval, null, this.startTime, null).subscribe(res => {
            this.interpolatedData = res
          }, error => {
            this.interpolatedError = error.json();
        });
      }, error => {
        this.piPointError = error.data
        this.piPointExistsValue = false
    });

    let point1webId = this.piWebApiHttpService.webIdHelper.generateWebIdByPath("\\\\PISRV1\\SINUSOID", PIPoint.name, null);
    let point2webId = this.piWebApiHttpService.webIdHelper.generateWebIdByPath("\\\\PISRV1\\CDT158", PIPoint.name, null);
    let point3webId = this.piWebApiHttpService.webIdHelper.generateWebIdByPath("\\\\PISRV1\\SINUSOIDU", PIPoint.name, null);
    let piAttributeWebId = this.piWebApiHttpService.webIdHelper.generateWebIdByPath("\\\\PISRV1\\Universities\\UC Davis\\Buildings\\Academic Surge Building|Electricity Totalizer", PIAttribute.name, PIElement.name);
    let piElementWebId = this.piWebApiHttpService.webIdHelper.generateWebIdByPath("\\\\PISRV1\\Universities\\UC Davis\\Buildings\\Academic Surge Building", PIElement.name, null);
    let piDataServerWebId = this.piWebApiHttpService.webIdHelper.generateWebIdByPath("\\\\PISRV1", PIDataServer.name, null);

    let piDataServer : PIDataServer = null;
    let piAttribute : PIAttribute = null;
    let piElement : PIElement  = null;
    this.piWebApiHttpService.dataServer.get(piDataServerWebId).subscribe(res => {
        piDataServer = res;
    });
    this.piWebApiHttpService.attribute.get(piAttributeWebId).subscribe(res => {
        piAttribute = res;
    });
    this.piWebApiHttpService.element.get(piElementWebId).subscribe(res => {
        piElement = res;
    });


    var piAttributeWebIdInfo = this.piWebApiHttpService.webIdHelper.getWebIdInfo(piAttributeWebId);
    var piElementWebIdInfo = this.piWebApiHttpService.webIdHelper.getWebIdInfo(piElementWebId);
    var piDataServerWebIdInfo = this.piWebApiHttpService.webIdHelper.getWebIdInfo(piDataServerWebId);
  }
}