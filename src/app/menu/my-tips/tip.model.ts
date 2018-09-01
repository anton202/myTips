export class Tip {
    date: string;
    yearMonth: string;
    amount: number;
    startTime: string;
    endTime: string;
    shiftCategory: string;
    name?: string;
    totalTime?: number;
    perHour?: number;

    constructor(
        date: string, 
        amount: number,
        startTime: string,
        endTime: string,
        shiftCategory: string,
        name?: string,
        totalTime?: number,
        perHour?: number
    ) {
        this.date = date;
        this.amount = amount;
        this.startTime = startTime;
        this.endTime = endTime;
        this.shiftCategory = shiftCategory;
        this.name = name;
        this.totalTime = totalTime;
        this.perHour = perHour;
    }

}
