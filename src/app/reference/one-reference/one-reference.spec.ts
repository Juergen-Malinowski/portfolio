import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneReference } from './one-reference';

describe('OneReference', () => {
  let component: OneReference;
  let fixture: ComponentFixture<OneReference>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneReference]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneReference);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
