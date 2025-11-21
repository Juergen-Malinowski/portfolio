import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonApi } from './pokemon-api';

describe('PokemonApi', () => {
  let component: PokemonApi;
  let fixture: ComponentFixture<PokemonApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonApi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonApi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
