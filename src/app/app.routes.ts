import { Routes } from '@angular/router';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { PlanningComponent } from './planning/planning.component';
import { NavigationComponent } from './navigation/navigation.component';

export const routes: Routes = [
  { 
    path: '', 
    component: NavigationComponent,
    children: [
      { path: '', redirectTo: 'suggestions', pathMatch: 'full' },
      { path: 'suggestions', component: SuggestionsComponent },
      { path: 'planning', component: PlanningComponent }
    ]
  }
];
