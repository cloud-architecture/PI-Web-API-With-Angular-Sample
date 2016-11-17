import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map'



@Injectable()
export class PIWebAPIService {
    private piWebApiBaseUrl = 'https://marc-web-sql.marc.net/piwebapi';  // URL to web api
    constructor(private http: Http)
     { 

     }

     getHeader() : any {
         var authHeader = new Headers();
         authHeader.append('Authorization', 'Basic ' + btoa('username:password')); 
         return authHeader;
     }

     validPIServerName(piServerName : string) : any { 
         return this.http.get(this.piWebApiBaseUrl + "dataservers?name=" + piServerName,  {headers: this.getHeader() });
    };


     validPIPointName(piServerName : string, piPointName : string) : any {
         return this.http.get(this.piWebApiBaseUrl + "points?path=\\\\" + piServerName + "\\" + piPointName,  {headers: this.getHeader() });
    };


    getSnapshotValue(webId:string) : any {
         return this.http.get(this.piWebApiBaseUrl + 'streams/' + webId + '/value',  {headers: this.getHeader() });
    };

    getRecordedValues(webId : string, startTime : string, endTime : string) {
        return this.http.get(this.piWebApiBaseUrl + 'streams/' + webId + '/recorded?starttime=' + startTime + '&endtime=' + endTime,  {headers: this.getHeader() });
    };

   getInterpolatedValues(webId : string, startTime  :string, endTime : string, interval : string) {
        return this.http.get(this.piWebApiBaseUrl  + 'streams/' + webId + '/interpolated?starttime=' + startTime + '&endtime=' + endTime + "&interval=" + interval,  {headers: this.getHeader() });
    };
}

