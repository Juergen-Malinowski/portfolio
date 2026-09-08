import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Skill {
  labelKey: string;
  icon: string;
  accent?: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  readonly skills: Skill[] = [
    // Frontend
    { labelKey: 'skills.items.html', icon: 'img/skills/HTML.svg' },
    { labelKey: 'skills.items.css', icon: 'img/skills/CSS.svg' },
    { labelKey: 'skills.items.javascript', icon: 'img/skills/JavaScript.svg' },
    { labelKey: 'skills.items.typescript', icon: 'img/skills/TypeScript.svg' },
    { labelKey: 'skills.items.angular', icon: 'img/skills/Angular.svg' },

    // Backend and data
    { labelKey: 'skills.items.python', icon: 'img/skills/Python.svg' },
    { labelKey: 'skills.items.django', icon: 'img/skills/Django.svg' },
    {
      labelKey: 'skills.items.djangoRestFramework',
      icon: 'img/skills/Django-REST-Framework.svg',
    },
    { labelKey: 'skills.items.restApi', icon: 'img/skills/REST-API.svg' },
    { labelKey: 'skills.items.postgresql', icon: 'img/skills/PostgreSQL.svg' },
    { labelKey: 'skills.items.redis', icon: 'img/skills/Redis.svg' },
    { labelKey: 'skills.items.firebase', icon: 'img/skills/Firebase.svg' },

    // Development and infrastructure
    { labelKey: 'skills.items.git', icon: 'img/skills/Git.svg' },
    { labelKey: 'skills.items.github', icon: 'img/skills/GitHub.svg' },
    { labelKey: 'skills.items.docker', icon: 'img/skills/Docker.svg' },
    { labelKey: 'skills.items.linux', icon: 'img/skills/Linux.svg' },
    { labelKey: 'skills.items.nginx', icon: 'img/skills/Nginx.svg' },
    { labelKey: 'skills.items.gunicorn', icon: 'img/skills/Gunicorn.svg' },
    { labelKey: 'skills.items.pytest', icon: 'img/skills/Pytest.svg' },

    // Methodology and continuous learning
    { labelKey: 'skills.items.scrum', icon: 'img/skills/Scrum.svg' },
    { labelKey: 'skills.items.materialDesign', icon: 'img/skills/Material-Design.svg' },
    {
      labelKey: 'skills.items.continuousLearning',
      icon: 'img/skills/Continually-Learning.svg',
      accent: true,
    },
  ];
}
