import { Component } from '@angular/core';
import { Landingpage } from './landingpage/landingpage';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';

@Component({
  selector: 'app-mainpage',
  imports: [Landingpage, About, Skills, Projects, Contact],
  templateUrl: './mainpage.html',
})
export class Mainpage {}
