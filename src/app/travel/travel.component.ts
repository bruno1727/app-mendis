import { LiveAnnouncer } from '@angular/cdk/a11y';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, inject } from '@angular/core';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { TravelService } from './services/travel.service';
import { TravelRequest } from './models/travel.request';
import { TravelResponse } from './models/travel.response';
import { DestinosComponent } from './destinos/destinos.component'
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-travel',
  standalone: true,
  imports: [MatFormFieldModule, MatChipsModule, MatIconModule, MatButtonModule, DestinosComponent, MatTooltipModule, CommonModule],
  templateUrl: './travel.component.html',
  styleUrl: './travel.component.css',
})
export class TravelComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  characteristics: string[] = [];
  travels: TravelResponse[] = [];

  country: string = '';
  countries = [
    { name: 'Brasil', icon: 'fi-br' },
    { name: 'México', icon: 'fi-mx' },
    { name: 'Argentina', icon: 'fi-ar' },
    { name: 'Itália', icon: 'fi-it' }
  ];

  announcer = inject(LiveAnnouncer);

  constructor(private service: TravelService) { }

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
    this.service.search(
      {
        country: this.country,
        characteristics: this.characteristics
      } as TravelRequest).subscribe(data => {
      this.travels = data;
    });
  }
}
