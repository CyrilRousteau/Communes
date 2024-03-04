import { Component, Input  } from '@angular/core';
import { CommonModule, NgForOf, NgStyle } from '@angular/common';
import { Commune } from '../models/commune.model';


@Component({
  selector: 'app-liste-commune',
  standalone: true,
  imports: [CommonModule,NgForOf,NgStyle],
  templateUrl: './liste-commune.component.html',
  styleUrl: './liste-commune.component.css'
})
export class ListeCommuneComponent {
  @Input() listeCommunes: Commune[] = [];

  couleurProvince(province: string, superficie: number): string {
    let opacite = this.opaciteCommune(superficie);
    if (province === "Sud") {
      return `rgba(0, 170, 0, ${opacite})`;
    } else if (province === "Nord") {
      return `rgba(170, 0, 0, ${opacite})`;
    } else if (province === "Iles") {
      return `rgba(0, 0, 170, ${opacite})`;
    } else {
      return `rgba(0, 0, 0, ${opacite})`;
    }
  }
  

  // Taille de la police d'affichage en fonction de la superficie 
  tailleCommune(population: number): number {
    return Math.ceil((population / 2000) + 15)
  }

  // Opacité en fonction de la superficie de la commune
  opaciteCommune(superficie: number): number {
    return superficie / 1300; 
  }
}
