import { PipeTransform , Pipe} from "@angular/core";

@Pipe({
    name:'shortenDate'
})
export class ShortenDatePipe implements PipeTransform {
    transform(value:any){
        return value.substring(0,5);
    }

}