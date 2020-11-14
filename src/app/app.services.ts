import { HttpClient } from '@angular/common/http';

//const URL = 'http://localhost:3000/';
const URL = 'http://192.168.0.154:3000/';
export class AppServices {
    
   
   
    
    constructor(public httpClient: HttpClient) {

    }

    checkCalAlreadySaved() {
        return this.httpClient.post(URL + 'checkCalAlreadySaved', { 'data' : 0 });
    }

    startNewCalibration() {
        return this.httpClient.post(URL + 'startNewCalibration', { 'data' : 0 });
    }

    openCalibrationStatus() {
        return this.httpClient.post(URL + 'openCalibrationStatus', { 'data' : 0 });
    }

    shortCalibrationStatus() {
        return this.httpClient.post(URL + 'shortCalibrationStatus', { 'data' : 0 });
    }

    loadCalibrationStatus() {
        return this.httpClient.post(URL + 'loadCalibrationStatus', { 'data' : 0 });
    }

    saveCalibrationStatus() {
        return this.httpClient.post(URL + 'saveCalibrationStatus', { 'data' : 0 });
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

    startMeasurement(data: any) {
        return this.httpClient.post(URL + 'startMeasurement', data);
    }
}