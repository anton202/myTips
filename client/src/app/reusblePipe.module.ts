import { NgModule } from "@angular/core";
import { ShortenDatePipe } from "./menu/my-tips/shortenDate.pipe";

@NgModule({
  declarations:[ShortenDatePipe],
  exports:[ShortenDatePipe]  
})
export class ReuseblePipe {

}