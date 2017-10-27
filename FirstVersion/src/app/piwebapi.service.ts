import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';



@Injectable()
export class PIWebAPIService {
    private piWebApiBaseUrl = 'https://devdata.osisoft.com/piwebapi/';  // URL to web api
    constructor(private http: Http) {
     }

     getHeader(): any {
         const authHeader = new Headers();
         authHeader.append('Authorization', 'Basic ' + btoa('user:password'));
         return authHeader;
     }

     validPIServerName(piServerName: string): any {
         return this.http.get(this.piWebApiBaseUrl + 'dataservers?name=' + piServerName,  {headers: this.getHeader() });
    }


     validPIPointName(piServerName: string, piPointName: string): any {
         return this.http.get(this.piWebApiBaseUrl + 'points?path=\\\\' + piServerName + '\\' + piPointName,  {headers: this.getHeader() });
    }


    getSnapshotValue(webId: string): any {
         return this.http.get(this.piWebApiBaseUrl + 'streams/' + webId + '/value',  {headers: this.getHeader() });
    }

    getRecordedValues(webId: string, startTime: string, endTime: string) {
        return this.http.get(this.piWebApiBaseUrl + 'streams/' + webId + '/recorded?starttime=' + startTime + '&endtime=' + endTime,
          {headers: this.getHeader() });
    }

   getInterpolatedValues(webId: string, startTime: string, endTime: string, interval: string) {
        return this.http.get(
            this.piWebApiBaseUrl  + 'streams/' + webId + '/interpolated?starttime=' + startTime + '&endtime='
             + endTime + '&interval=' + interval, {headers: this.getHeader() });
    }
}

