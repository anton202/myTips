import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export class WaitrsBookService {

    constructor(private http: HttpClient) { }

    public getWorkersNames(): Observable<any> {
        return this.http.get<Array<string>>(environment.apiUrl + '/user/getNames')
    }

    public calculateWaitrsTotalTime(startTime, endTime): number {
        const splitStartTime = startTime.split(':');
        const splitEndTime = endTime.split(':');

        const startTimeInSeconds = (+splitStartTime[0]) * 60 * 60 + (+splitStartTime[1]) * 60;
        const endTimeInSeconds = (+splitEndTime[0]) * 60 * 60 + (+splitEndTime[1]) * 60;

        const totalTimeInSeconds = endTimeInSeconds - startTimeInSeconds;
        const totalTimeInHours = +((totalTimeInSeconds / 3600).toFixed(2));

        return totalTimeInHours;
    }

    public setwaitrsTotalTime(waitrsStack: Array<object>): void {
        waitrsStack.forEach((waitr: { shiftStartTime, shiftEndTime, totalTime }) => {
            waitr.totalTime = this.calculateWaitrsTotalTime(waitr.shiftStartTime, waitr.shiftEndTime)
        })   
    }

    public calculateTotalTime(waitrsStack: Array<object>): number {
        const totalTime = waitrsStack.reduce((acc: number, waitr: { totalTime }) => {
            acc += waitr.totalTime
            return acc;
        }, 0)

        return totalTime;
    }

    public barManTip(totalTip: number, percentage: number): number {
        return +(((percentage * totalTip) / 100).toFixed(2));
    }

    public moneyToEmployer(totalTime: number, rate: number): number {
        return totalTime * rate
    }

    public tipPerHour(totalTip: number, totalTime: number): number {
        return +((totalTip / totalTime).toFixed(2));
    }

    public setWaitrsPerHourTip(waitrs: any, totalTime: number, totalTip: number): void {
        waitrs.forEach(waitr => {
            waitr.tipPerHour = this.tipPerHour(totalTip, totalTime)
        })
    }

    public setWaitrsTotalTip(waitrs: any): void {
        waitrs.forEach(waitr => {
            waitr.totalTip = +((waitr.totalTime * waitr.tipPerHour).toFixed(2))
        })
    }

    public setWaitrsMoneyToEmployer(waitrs: any): void {
        waitrs.forEach(waitr => {
            waitr.moneyToEmployer = Math.floor(this.moneyToEmployer(waitr.totalTime, 6));
        })
    }

}