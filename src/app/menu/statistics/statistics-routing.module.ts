import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { StatisticsComponent } from './statistics.component';
import { WaitrsBookStatisticsComponent } from './waitrs-book-statistics/waitrs-book-statistics.component';
import { WaitrsBookLogComponent } from './waitrs-book-statistics/waitrs-book-log/waitrs-book-log.component';

const statisticsRoutes:Routes = [
    {path:'', component: StatisticsComponent},
    {path:'waitrs-book-statistics', component: WaitrsBookStatisticsComponent},
    {path:'waitrs-book-statistics/:state', component: WaitrsBookStatisticsComponent},
    {path:'waitrs-book-log/:year/:month',component: WaitrsBookLogComponent}
]
    


@NgModule({
    imports: [
        RouterModule.forChild(statisticsRoutes)
    ],
    exports: [RouterModule]
})
export class StatisticsRoutingModule{

}