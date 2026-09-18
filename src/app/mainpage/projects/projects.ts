import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Project {
  id: string;
  title: string;
  image: string;
  techStack: string;
  descriptionKey: string;
  imageAltKey: string;
  githubUrl: string;
  liveUrl?: string;
}

@Component({
  selector: 'app-projects',
  imports: [TranslatePipe],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

  readonly projects: Project[] = [
    {
      id: 'coderr',
      title: 'Coderr',
      image: 'img/project/coderr.webp',
      techStack: 'Python | Django | Django REST Framework | REST API',
      descriptionKey: 'projects.items.coderr.description',
      imageAltKey: 'projects.items.coderr.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/Backend-Project-Coderr',
      liveUrl: 'https://coderr.juergen-malinowski.de',
    },
    {
      id: 'kanmind',
      title: 'KanMind',
      image: 'img/project/kanmind.webp',
      techStack: 'Python | Django | Django REST Framework | REST API',
      descriptionKey: 'projects.items.kanmind.description',
      imageAltKey: 'projects.items.kanmind.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/Project-KanMind',
    },
    {
      id: 'join',
      title: 'Join',
      image: 'img/project/join.webp',
      techStack: 'Angular | TypeScript | Firebase',
      descriptionKey: 'projects.items.join.description',
      imageAltKey: 'projects.items.join.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/Join',
    },
    {
      id: 'pokedex',
      title: 'Pokedex',
      image: 'img/project/pokedex.webp',
      techStack: 'JavaScript | HTML | CSS | REST API',
      descriptionKey: 'projects.items.pokedex.description',
      imageAltKey: 'projects.items.pokedex.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/modul-8-pokemon-api',
    },
    {
      id: 'bestell-app',
      title: 'Bestell-App',
      image: 'img/project/bestell-app.webp',
      techStack: 'JavaScript | HTML | CSS',
      descriptionKey: 'projects.items.bestellApp.description',
      imageAltKey: 'projects.items.bestellApp.imageAlt',
      githubUrl: 'https://github.com/Juergen-Malinowski/modul-7-bestell-app',
    },
  ];
}
