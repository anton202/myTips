export class Time{
    static calculateTime(startTime,endTime){
        const startTimeMinutes = startTime.split(":");
        const endTimeMinutes = endTime.split(":");

        const startTimeToDecimel = +startTimeMinutes[1] / 60;
        const endTimeMinutesToDecimel = +endTimeMinutes[1] / 60;
        
        return {
            startTime: +startTimeMinutes[0] + startTimeToDecimel,
            endTime: +endTimeMinutes[0] + endTimeMinutesToDecimel
        }
    }
}