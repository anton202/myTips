import { Subject } from 'rxjs';

export class AddTipService{   
    formState = new Subject<string>();

    setYearMonth(){
        const date = new Date();
        const yearMonth = date.getFullYear()+'-'+date.getMonth();
        return yearMonth.toString();
      }


}