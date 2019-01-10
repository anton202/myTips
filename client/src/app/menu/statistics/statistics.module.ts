import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


import { StatisticsComponent } from './statistics.component';
import { WaitrsBookLogComponent } from './waitrs-book-log/waitrs-book-log.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ReuseblePipe } from '../../reusblePipe.module'
import { HighLightTip } from './waitrs-book-log/highlightTip.directive'

@NgModule({
    declarations:[
        StatisticsComponent,
        WaitrsBookLogComponent,
        HighLightTip
    ],
    imports: [
        FormsModule,
        CommonModule,
        StatisticsRoutingModule,
        ReuseblePipe
    ],
    exports:[StatisticsComponent]
})
export class StatisticsModule{

}