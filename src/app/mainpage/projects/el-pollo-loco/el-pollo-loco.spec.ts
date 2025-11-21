import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElPolloLoco } from './el-pollo-loco';

describe('ElPolloLoco', () => {
  let component: ElPolloLoco;
  let fixture: ComponentFixture<ElPolloLoco>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElPolloLoco]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElPolloLoco);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
