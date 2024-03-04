import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import {ListeCommuneComponent} from "./liste-commune/liste-commune.component";
import { Commune } from './models/commune.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, ListeCommuneComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'commune';
  constructor(private http: HttpClient) {
  }

  jsonData: any;

  listeCommunes: Commune[] = [];

  ngOnInit() {
    this.http.get<Commune[]>('assets/data/communes-nc.json').subscribe(data => {
      this.listeCommunes = data
        .map(commune => ({
          ...commune,
          Superficie: parseFloat(commune.Superficie as any),
          Population: parseInt(commune.Population as any)
        }))
        .sort((a, b) => {
          // Tri par province
          const provinceCompare = a.Province.localeCompare(b.Province);
          if (provinceCompare !== 0) return provinceCompare;
          // Tri par Superficie
          return a.Superficie - b.Superficie;
        });
    });
  }
  
  
}