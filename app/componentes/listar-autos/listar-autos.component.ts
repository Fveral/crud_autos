import { Component, inject, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { Firestore, collection, collectionData} from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoService } from '../../services/auto.service';

@Component({
  selector: 'app-listar-autos',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listar-autos.component.html',
  styleUrl: './listar-autos.component.css'
})
export class ListarAutosComponent implements OnInit {
  autos: any[] =[];
  firestore: Firestore = inject(Firestore);
  items$: Observable<any[]>;

  constructor(private autoService: AutoService) {
    const aCollection = collection(this.firestore, 'items')
    this.items$ = collectionData(aCollection);
  }

  ngOnInit(): void {
    this.getAutos();
  }

  getAutos() {
    this.autoService.obtenerAutos().subscribe(data => {
      console.log('Autos:', data); // Asegúrate de que cada auto tiene un id
      this.autos = data;
    });
  }


  deleteAuto(id: string) {
    this.autoService.eliminarAutoService(id).then(() => {
      this.getAutos();
    }).catch(error => {
      console.error('Error eliminando el auto: ', error);
    });
  }

}
