import { Routes } from '@angular/router';
import { Mainpage } from './mainpage/mainpage';
import { Imprint } from './legal/imprint/imprint';
import { Privacy } from './legal/privacy/privacy';

export const routes: Routes = [
  {
    path: '',
    component: Mainpage,
  },
  {
    path: 'imprint',
    component: Imprint,
  },
  {
    path: 'privacy',
    component: Privacy,
  },
];
