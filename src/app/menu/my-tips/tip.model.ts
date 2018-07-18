export class Tip {
date: Date;
amount: number;
startTime: string;
endTime: string;
shiftCategory: string;

constructor(date: Date, amount: number, startTime: string, endTime: string, shiftCategory: string) {
this.date = date;
this.amount = amount;
this.startTime = startTime;
this.endTime = endTime;
this.shiftCategory = shiftCategory;
}

}
