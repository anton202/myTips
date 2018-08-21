import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-waitrs-book-statistics',
  templateUrl: './waitrs-book-statistics.component.html',
  styleUrls: ['./waitrs-book-statistics.component.css']
})
export class WaitrsBookStatisticsComponent implements OnInit {
waitrsBook: boolean = false;
state: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.state = this.route.snapshot.params.state;
  }

  onWaitrsBook(){
    this.waitrsBook = !this.waitrsBook;
  }

  displayForm(){
    if(this.waitrsBook){
      return 'block';
    }
  }

  onSubmit(form: NgForm){
    const month = form.value.month;
    const year = form.value.year;
    this.router.navigate(['waitrs-book-log/'+year + '/' + month]);
    }

}
