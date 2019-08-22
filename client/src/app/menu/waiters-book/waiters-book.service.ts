import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { wtfEndTimeRange } from '@angular/core';

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

    public setwaitrsTotalTime(waitrsStack: Array<object>): Array<object> {
        const waitrsStckClone = waitrsStack.slice();

        waitrsStckClone.forEach((waitr: { shiftStartTime, shiftEndTime, totalTime }) => {
            waitr.totalTime = this.calculateWaitrsTotalTime(waitr.shiftStartTime, waitr.shiftEndTime)
        })

        return waitrsStckClone
    }

    public calculateTotalTime(waitrsStack: Array<object>): number {
        const waitrsStckClone = waitrsStack.slice();

        const totalTime = waitrsStckClone.reduce((acc: number, waitr: { totalTime }) => {
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
}