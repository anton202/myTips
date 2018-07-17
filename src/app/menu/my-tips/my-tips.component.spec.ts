import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTipsComponent } from './my-tips.component';

describe('MyTipsComponent', () => {
  let component: MyTipsComponent;
  let fixture: ComponentFixture<MyTipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
