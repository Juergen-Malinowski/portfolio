import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestellApp } from './bestell-app';

describe('BestellApp', () => {
  let component: BestellApp;
  let fixture: ComponentFixture<BestellApp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestellApp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestellApp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
