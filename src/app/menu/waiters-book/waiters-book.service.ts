import { WaitrTip } from './waitr-tip.model'

export class WaitrsBookService{
    waitrsTips: WaitrTip[] = [];


addTip(waitrTip:WaitrTip){
    this.waitrsTips.push(waitrTip);
    console.log(this.waitrsTips);
}


}