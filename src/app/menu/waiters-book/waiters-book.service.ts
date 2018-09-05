import { Tip } from '../my-tips/tip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class WaitrsBookService {
    waitrsTips: Tip[] = [];
    totalTipsChanged = new Subject<number>();

    constructor(private http: HttpClient){}

    addTip(waitrTip: Tip) {
        this.http.post('http://localhost:8000/api/waitrsBook/addTip',waitrTip)
        .subscribe(response =>{
            console.log(response);
            this.waitrsTips.push(new Tip(
                null,
                waitrTip.date,
                waitrTip.amount,
                waitrTip.startTime,
                waitrTip.endTime,
                waitrTip.shiftCategory,
                waitrTip.yearMonth,
                waitrTip.name,
                waitrTip.totalTime,
                waitrTip.perHour,
                waitrTip.waitrsBook
            ));
        },
        error => {console.log(error)}
    )
        
        console.log(this.waitrsTips);
    }

    deleteTip(id: number) {
        this.totalTipsChanged.next(this.waitrsTips[id].amount);
        this.waitrsTips.splice(id, 1);
        
    }

    getTips(){
        return this.http.get<{tips}>('http://localhost:8000/api/waitrsBook/getTodaysTips/'+ new Date().toLocaleDateString());
    }
}