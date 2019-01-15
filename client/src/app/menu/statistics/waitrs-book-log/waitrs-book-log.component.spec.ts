import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitrsBookLogComponent } from './waitrs-book-log.component';

describe('WaitrsBookLogComponent', () => {
    let component: WaitrsBookLogComponent;
    let fixture: ComponentFixture<WaitrsBookLogComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WaitrsBookLogComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WaitrsBookLogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});