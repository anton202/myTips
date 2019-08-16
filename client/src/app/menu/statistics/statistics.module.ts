import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { StatisticsComponent } from './statistics.component';
import { WaitrsBookLogComponent } from './waitrs-book-log/waitrs-book-log.component';
import { StatisticsRoutingModule } from './statistics-routing.module';
import { ReuseblePipe } from '../../reusblePipe.module'
import { HighLightTipDirective } from './waitrs-book-log/highlightTip.directive';


@NgModule({
    declarations: [
        StatisticsComponent,
        WaitrsBookLogComponent,
        HighLightTipDirective,

    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        StatisticsRoutingModule,
        ReuseblePipe,
        MatTableModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule
    ],
    exports: [StatisticsComponent]
})
export class StatisticsModule {

}