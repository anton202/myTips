import { NgModule } from "@angular/core";
import { ShortenDatePipe } from "./directives/shortenDate.pipe";

@NgModule({
  declarations:[ShortenDatePipe],
  exports:[ShortenDatePipe]  
})
export class ReuseblePipe {

}