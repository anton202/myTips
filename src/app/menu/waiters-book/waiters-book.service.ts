import { Tip } from '../my-tips/tip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export class WaitrsBookService {
    waitrsTips: Tip[] = [];
    totalTipsChanged = new Subject<number>();
    tipsFetched = new Subject<Tip[]>();

    constructor(private http: HttpClient){}

    addTip(waitrTip: Tip) {
        this.http.post('http://localhost:8000/api/waitrsBook/addTip',waitrTip)
        .subscribe((tip:{tip}) =>{
            this.waitrsTips.push(new Tip(
                  tip.tip._id,
                  tip.tip.date,
                  tip.tip.amount,
                  tip.tip.startTime,
                  tip.tip.endTime,
                  tip.tip.shiftCategory,
                  tip.tip.yearMonth,
                  tip.tip.name,
                  tip.tip.totalTime,
                  tip.tip.perHour,
                  tip.tip.waitrsBook
            ));
            this.tipsFetched.next(this.waitrsTips);
        },
        error => {console.log(error)}
    )
        
        console.log(this.waitrsTips);
    }

    deleteTip(id: number) {
        this.http.delete('http://localhost:8000/api/waitrsBook/deleteTip/'+this.waitrsTips[id].id)
        .subscribe(response => {
            console.log(response)
            this.totalTipsChanged.next(this.waitrsTips[id].amount);
            this.waitrsTips.splice(id, 1);
        },
        error => console.log(error)
    )
    }

    getTips(){
         this.http.get<{tips}>('http://localhost:8000/api/waitrsBook/getTodaysTips/'+ new Date().toLocaleDateString())
        .subscribe(tips => {
            console.log(tips)
            tips.tips.forEach(tip => {
              this.waitrsTips.push(new Tip(
                  tip._id,
                  tip.date,
                  tip.amount,
                  tip.startTime,
                  tip.endTime,
                  tip.shiftCategory,
                  tip.yearMonth,
                  tip.name,
                  tip.totalTime,
                  tip.perHour,
                  tip.waitrsBook
              ));
            });
            this.tipsFetched.next(this.waitrsTips);
          })
    }
}