import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export class WaitrsBookService {
   
    constructor(private http: HttpClient){}

    getWorkersNames(){
        return this.http.get(environment.apiUrl+'/user/getNames')
    }

}