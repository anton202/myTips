export class Tip {
date: string;
amount: number;
startTime: string;
endTime: string;
shiftCategory: string;
name?:string;
totalTime?: number;

constructor(date: string, amount: number, startTime: string, endTime: string, shiftCategory: string, name?:string,totalTime?:number) {
this.date = date;
this.amount = amount;
this.startTime = startTime;
this.endTime = endTime;
this.shiftCategory = shiftCategory;
this.name = name;
this.totalTime = totalTime;
}

}
