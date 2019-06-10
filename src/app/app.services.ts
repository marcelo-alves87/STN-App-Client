import { HttpClient } from '@angular/common/http';

const URL = 'http://localhost:3000/';

export class AppServices {     

    constructor(public httpClient: HttpClient) {

    }

    processFile(fileName) {
        return this.httpClient.post(URL + 'fileProcess', {'fileName' : fileName});
    }
}