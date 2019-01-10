import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StatisticsComponent } from './statistics.component';
import { WaitrsBookLogComponent } from './waitrs-book-log/waitrs-book-log.component';

const statisticsRoutes:Routes = [
    {path:'', component: StatisticsComponent},
    {path:'waitrs-book-log/:state/:yearMonth',component: WaitrsBookLogComponent}
]
    
@NgModule({
    imports: [
        RouterModule.forChild(statisticsRoutes)
    ],
    exports: [RouterModule]
})
export class StatisticsRoutingModule{

}