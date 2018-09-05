import { Tip } from '../my-tips/tip.model';
import { Subject } from 'rxjs';

export class WaitrsBookService {
    waitrsTips: Tip[] = [];
    totalTipsChanged = new Subject<number>();


    addTip(waitrTip: Tip) {
        this.waitrsTips.push(new Tip(
            null,
            waitrTip.date,
            waitrTip.amount,
            waitrTip.startTime,
            waitrTip.endTime,
            waitrTip.shiftCategory,
            null,
            waitrTip.name,
            waitrTip.totalTime,
            waitrTip.perHour
        ));
        console.log(this.waitrsTips);
    }

    deleteTip(id: number) {
        this.totalTipsChanged.next(this.waitrsTips[id].amount);
        this.waitrsTips.splice(id, 1);
        
    }

}