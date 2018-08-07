import { Tip } from '../my-tips/tip.model';

export class WaitrsBookService{
    waitrsTips: Tip[] = [];


addTip(waitrTip:Tip){
    this.waitrsTips.push(waitrTip);
    console.log(this.waitrsTips);
}


}