export class Waitr {
    name: string;
    shiftStartTime: string;
    shiftEndTime: string;
    totalTime: number;
    tipPerHour: number;
    totalTip: number;
    moneyToEmployer: number;

    constructor(name: string, shiftStartTime: string, shiftEndTime: string, totalTime?: number, tipPerHour?: number, totalTip?: number, moneyToEmployer?: number) {
        this.name = name;
        this.shiftStartTime = shiftStartTime;
        this.shiftEndTime = shiftEndTime;
        this.totalTime = totalTime;
        this.tipPerHour = tipPerHour;
        this.totalTip = totalTip;
        this.moneyToEmployer = moneyToEmployer
    }
}