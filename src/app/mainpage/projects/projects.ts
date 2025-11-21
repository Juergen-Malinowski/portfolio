import { Component } from '@angular/core';
import { ElPolloLoco } from './el-pollo-loco/el-pollo-loco';
import { PokemonApi } from './pokemon-api/pokemon-api';
import { BestellApp } from './bestell-app/bestell-app';

@Component({
  selector: 'app-projects',
  imports: [ElPolloLoco, PokemonApi, BestellApp],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

  scrollToProjects() {
    const target = document.getElementById('projects');
    if (target) {
      const offset = 150; // Höhe des Headers
      const rect = target.getBoundingClientRect().top;
      const scrollPosition = window.scrollY + rect - offset;
      window.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  }


}
