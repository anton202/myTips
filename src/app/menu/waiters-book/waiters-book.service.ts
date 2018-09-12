import { Tip } from '../my-tips/tip.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export class WaitrsBookService {
    waitrsTips: Tip[] = [];
    totalTipsChanged = new Subject<number>();
    tipsFetched = new Subject<Tip[]>();
    errorMessage = new Subject<string>();

    constructor(private http: HttpClient){}

    addTip(waitrTip: Tip) {
        this.http.post(environment.apiUrl+'/waitrsBook/addTip',waitrTip)
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
        error => {this.errorMessage.next(error.message)}
    )
        
        
    }

    deleteTip(id: number) {
        this.http.delete(environment.apiUrl+'/waitrsBook/deleteTip/'+this.waitrsTips[id].id)
        .subscribe(response => {
           
            this.totalTipsChanged.next(this.waitrsTips[id].amount);
            this.waitrsTips.splice(id, 1);
        },
        error => this.errorMessage.next(error.message)
    )
    }

    getTips(){
         this.http.get<{tips}>(environment.apiUrl+'/waitrsBook/getTodaysTips/'+ new Date().toLocaleDateString())
        .subscribe(tips => {
            
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
          },
        error => this.errorMessage.next(error.message))
    }


    getWorkersNames(){
        return this.http.get(environment.apiUrl+'/user/getNames')
    }

}