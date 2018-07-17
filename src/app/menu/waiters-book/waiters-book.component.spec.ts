import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitersBookComponent } from './waiters-book.component';

describe('WaitersBookComponent', () => {
  let component: WaitersBookComponent;
  let fixture: ComponentFixture<WaitersBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitersBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitersBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
