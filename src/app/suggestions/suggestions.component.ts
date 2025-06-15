import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SuggestionsRequest } from './models/suggestions.request';
import { MatTooltipModule } from '@angular/material/tooltip';

import { DestinosComponent } from './destinos/destinos.component';
import { SuggestionsResponse } from './models/suggestions.response';
import { SuggestionsService } from './services/suggestions.service';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatButtonModule, MatProgressSpinnerModule, DestinosComponent, MatTooltipModule],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css',
})
export class SuggestionsComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  characteristics: string[] = [];
  suggestions: SuggestionsResponse[] = [];
  isLoading = false;

  country: string = '';
  countries = [
    { name: 'Brasil', icon: 'fi-br' },
    { name: 'México', icon: 'fi-mx' },
    { name: 'Argentina', icon: 'fi-ar' },
    { name: 'Itália', icon: 'fi-it' }
  ];

  announcer = inject(LiveAnnouncer);

  constructor(private service: SuggestionsService) { }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.characteristics.push(value);
    }

    event.chipInput!.clear();
  }

  remove(characteristic: string): void {
    const index = this.characteristics.indexOf(characteristic);

    if (index >= 0) {
      this.characteristics.splice(index, 1);

      this.announcer.announce(`Removed ${characteristic}`);
    }
  }

  edit(characteristic: string, event: MatChipEditedEvent) {
    const value = event.value.trim();

    if (!value) {
      this.remove(characteristic);
      return;
    }

    const index = this.characteristics.indexOf(characteristic);
    if (index >= 0) {
      this.characteristics[index] = value;
    }
  }

  clear(){
    this.characteristics = [];
  }

  search(){
    this.isLoading = true;
    this.service.search(
      {
        country: this.country,
        characteristics: this.characteristics
      } as SuggestionsRequest).subscribe({
        next: (data) => {
          this.suggestions = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro na busca:', error);
          this.isLoading = false;
        }
      });
  }
} 