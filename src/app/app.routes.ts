import { Routes } from '@angular/router';
import { Mainpage } from './mainpage/mainpage';
import { Imprint } from './legal/imprint/imprint';

export const routes: Routes = [
  {
    path: '',
    component: Mainpage,
  },
  {
    path: 'imprint',
    component: Imprint,
  },
];
