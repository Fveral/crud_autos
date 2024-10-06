import { Component } from '@angular/core';
import { RouterModule, Router, ActivatedRoute, RouterLink } from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { AutoService } from '../../services/auto.service';

@Component({
  selector: 'app-create-auto',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-auto.component.html',
  styleUrl: './create-auto.component.css'
})
export class CreateAutoComponent {
  crearAuto: FormGroup;
  submitted = false;
  id: string | null;

  constructor(private at: FormBuilder, private autoService: AutoService, private router: Router,
    private aRoute: ActivatedRoute) {
    this.crearAuto = at.group({
      nombre: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      year: ['', Validators.required],
      duenio: ['', Validators.required],
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.editar();
  }

  addAuto() {
    const auto: any = {
      nombre: this.crearAuto.value.nombre,
      marca: this.crearAuto.value.marca,
      modelo: this.crearAuto.value.modelo,
      year: this.crearAuto.value.year,
      duenio: this.crearAuto.value.duenio
    }

    if (this.id === null) {
      // Crear nuevo auto
      this.autoService.addAutoService(auto).then(() => {
        console.log('Auto registrado con éxito');
        this.router.navigate(['/listar']);
      }).catch(error => {
        console.log(error);
      });
    } else {
      // Editar auto existente
      this.autoService.updateAutoService(this.id, auto).then(() => {
        console.log('Auto actualizado con éxito');
        this.router.navigate(['/listar']);
      }).catch(error => {
        console.log(error);
      });
    }
  }

  editar() {
    if (this.id !== null) {
      this.autoService.obtenerAuto(this.id).subscribe(data => {
        this.crearAuto.patchValue({
          nombre: data['nombre'],
          marca: data['marca'],
          modelo: data['modelo'],
          year: data['year'],
          duenio: data['duenio']
        });
      });
    }
  }


}
