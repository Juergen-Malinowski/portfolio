import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneProject } from './one-project';

describe('OneProject', () => {
  let component: OneProject;
  let fixture: ComponentFixture<OneProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OneProject]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
