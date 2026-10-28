import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoWayAuthentication } from './two-way-authentication';

describe('TwoWayAuthentication', () => {
  let component: TwoWayAuthentication;
  let fixture: ComponentFixture<TwoWayAuthentication>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TwoWayAuthentication]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TwoWayAuthentication);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
