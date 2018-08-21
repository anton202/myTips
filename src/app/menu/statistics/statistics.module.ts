import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";

import { StatisticsComponent } from './statistics.component';
import { WaitrsBookStatisticsComponent } from './waitrs-book-statistics/waitrs-book-statistics.component';
import { WaitrsBookLogComponent } from './waitrs-book-statistics/waitrs-book-log/waitrs-book-log.component';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
    declarations:[
        StatisticsComponent,
        WaitrsBookStatisticsComponent,
        WaitrsBookLogComponent
    ],
    imports: [
        FormsModule,
        CommonModule,
        StatisticsRoutingModule
    ]
})
export class StatisticsModule{

}