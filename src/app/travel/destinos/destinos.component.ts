import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { TravelResponse } from '../models/travel.response';

@Component({
  selector: 'app-destinos',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './destinos.component.html',
  styleUrl: './destinos.component.css'
})
export class DestinosComponent {
  @Input() destinos: TravelResponse[] = [];
}
