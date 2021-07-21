import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/';
//const URL = 'http://192.168.1.145:3000/';
export class AppServices {
   
   socket:any;
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

    processFile() {
        return this.httpClient.post(URL + 'fileProcess', { 'data' : 0 });
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

    getFrequencyData(data: any) {
        return this.httpClient.get(URL + 'frequencydata', data);
    }

    getTimeDomainData() {
        return { "data": [
            {"time":0.0, "vswr":3.53738744813483},
            {"time":0.025, "vswr":15.4854856479947},
            {"time":0.05, "vswr":4.32452516561187},
            {"time":0.075, "vswr":1.36376410447472},
            {"time":0.1, "vswr":1.01971719989694},
            {"time":0.125, "vswr":1.02991831418763},
            {"time":0.15, "vswr":1.01427594561417},
            {"time":0.175, "vswr":1.02355724790177},
            {"time":0.2, "vswr":1.02283559483782},
            {"time":0.225, "vswr":1.01286058996557},
            {"time":0.25, "vswr":1.01465108650914},
            {"time":0.275, "vswr":1.00756527282909},
            {"time":0.3, "vswr":1.00638579983689},
            {"time":0.325, "vswr":1.00489920215502},
            {"time":0.35, "vswr":1.00222904929224},
            {"time":0.375, "vswr":1.0025980343194},
            {"time":0.4, "vswr":1.00018967462447},
            {"time":0.425, "vswr":1.00097125294014},
            {"time":0.45, "vswr":1.00210079090923},
            {"time":0.475, "vswr":1.00163415832669},
            {"time":0.5, "vswr":1.00227324835303},
            {"time":0.525, "vswr":1.001518339986},
            {"time":0.55, "vswr":1.00192299334341},
            {"time":0.575, "vswr":1.00223658579317},
            {"time":0.6, "vswr":1.00402291601178},
            {"time":0.625, "vswr":1.00161307883825},
            {"time":0.65, "vswr":1.00329312036653},
            {"time":0.675, "vswr":1.00247318352952},
            {"time":0.7, "vswr":1.00316212719731},
            {"time":0.725, "vswr":1.00591783258028},
            {"time":0.75, "vswr":1.00550688515794},
            {"time":0.775, "vswr":1.00236189701106},
            {"time":0.8, "vswr":1.00090138838928},
            {"time":0.825, "vswr":1.00400833540634},
            {"time":0.85, "vswr":1.00458488769879},
            {"time":0.875, "vswr":1.00206119567834},
            {"time":0.9, "vswr":1.00127472942684},
            {"time":0.925, "vswr":1.00557766507717},
            {"time":0.950000000000001, "vswr":1.01314886573306},
            {"time":0.975000000000001, "vswr":1.01641905650229},
            {"time":1.0, "vswr":1.0106769675207},
            {"time":1.025, "vswr":1.00904730170486},
            {"time":1.05, "vswr":1.02973483722156},
            {"time":1.075, "vswr":1.03349327575135},
            {"time":1.1, "vswr":1.02194960488644},
            {"time":1.125, "vswr":1.00710963838676},
         
            
           
            ]}
    }

}