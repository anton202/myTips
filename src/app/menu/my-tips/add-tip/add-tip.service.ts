import { Subject } from 'rxjs';

export class AddTipService{   
    formState = new Subject<string>();

    setYearMonth(){
        const date = new Date();
        const yearMonth = date.getFullYear() + '-' + '0' + (date.getMonth() + 1);
        return yearMonth.toString();
      }

    calculatePerHour(startTime, endTime, totalTip){
        const startHour = startTime.split(':')[0];
        const startMin = startTime.split(':')[1];
        const endHour = endTime.split(':')[0];
        const endMin = endTime.split(':')[1];
        let totalHours;

        if(startHour === '00'){
                 totalHours = (parseInt(endHour,10) - 12) + (((parseInt(endMin,10) - parseInt(startMin,10))/60));
                 return totalHours
        }

        if(endHour === '00'){
            totalHours = (12 - parseInt(startHour.split("")[1],10)) + (((parseInt(endMin,10) - parseInt(startMin,10))/60));
            return totalHours
        }

        if(startHour.split("")[0] === '0'){
            totalHours = (parseInt(endHour,10) - parseInt(startHour.split("")[1],10)) + (((parseInt(endMin,10) - parseInt(startMin,10))/60));
            return totalHours
        }else {
            totalHours = (parseInt(endHour,10) - parseInt(startHour,10)) + (((parseInt(endMin,10) - parseInt(startMin,10))/60));
            return totalHours
        }
        
        
    }

}