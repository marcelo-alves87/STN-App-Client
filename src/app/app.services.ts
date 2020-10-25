import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/';

export class AppServices {
    

    constructor(public httpClient: HttpClient) {

    }

    processFile(data) {
        return this.httpClient.post(URL + 'fileProcess', data);
    }

    shutdown() {
        return this.httpClient.post(URL + 'shutdown', { 'data' : 0 });
    }

    checkConnectionAndCalibrationStatus() {
        return this.httpClient.post(URL + 'checkConnectionAndCalibrationStatus', {'data' : 0});
    }     
}