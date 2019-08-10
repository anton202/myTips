import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';


import { StatisticsComponent } from './statistics.component';
import { WaitrsBookLogComponent } from './waitrs-book-log/waitrs-book-log.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ReuseblePipe } from '../../reusblePipe.module'
import { HighLightTipDirective } from './waitrs-book-log/highlightTip.directive';

@NgModule({
    declarations:[
        StatisticsComponent,
        WaitrsBookLogComponent,
        HighLightTipDirective,
    ],
    imports: [
        FormsModule,
        CommonModule,
        StatisticsRoutingModule,
        ReuseblePipe,
        MatTableModule,
        MatButtonModule,
        MatSelectModule
    ],
    exports:[StatisticsComponent]
})
export class StatisticsModule{

}