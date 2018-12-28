import { PipeTransform , Pipe} from "@angular/core";

@Pipe({
    name:'shortenDate'
})
export class ShortenDatePipe implements PipeTransform {
    transform(value:any){
        return value.substr(0,5);
    }

}