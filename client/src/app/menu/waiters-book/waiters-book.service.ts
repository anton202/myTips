import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export class WaitrsBookService {
    waitrsTips = [];
    totalTipsChanged = new Subject<number>();
    tipsFetched = new Subject();
    errorMessage = new Subject<string>();

    constructor(private http: HttpClient){}

    sendWaitrsDataToServer(waitrsStack) {
        this.http.post(environment.apiUrl+'/waitrsBook/saveWaitrsTips',waitrsStack)
        .subscribe(()=>{},error =>{
            this.errorMessage.next(error.error.message)
        })
    }
    

    deleteTip(waitrData) {
        this.http.delete(environment.apiUrl+'/waitrsBook/deleteTip/',{observe:waitrData})
        .subscribe(response => {
        },
        error => this.errorMessage.next(error.error.message)
    )
    }

    getWorkersNames(){
        return this.http.get(environment.apiUrl+'/user/getNames')
    }

}