export class Tip {
    id: string;
    date: string;
    amount: number;
    startTime: string;
    endTime: string;
    shiftCategory: string;
    name?: string;
    totalTime?: number;
    perHour?: number;
    yearMonth: string;
    waitrsBook?: boolean

    constructor(
        id: string,
        date: string, 
        amount: number,
        startTime: string,
        endTime: string,
        shiftCategory: string,
        yearMonth?: string,
        name?: string,
        totalTime?: number,
        perHour?: number,
        waitrsBook?: boolean
    ) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.startTime = startTime;
        this.endTime = endTime;
        this.shiftCategory = shiftCategory;
        this.name = name;
        this.totalTime = totalTime;
        this.perHour = perHour;
        this.yearMonth = yearMonth;
        this.waitrsBook = waitrsBook;
    }

}