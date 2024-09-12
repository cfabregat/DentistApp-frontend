import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../interfaces/paciente';
import { ApiPacientesService } from '../../services/api-pacientes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vistapaciente',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vistapaciente.component.html',
  styleUrl: './vistapaciente.component.css'
})
export class VistapacienteComponent implements OnInit{
  pacientes:Paciente[] = [];
  paciente? :Paciente;
  nuevoDiagnostico: string = '';
  loading: boolean = true;
  
  constructor(private Apipacientes:ApiPacientesService,
    private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    //Ni bien inicia se obtiene un parametro - este parametro es el dni
    this.route.params.subscribe({
      next: params => {
        //Se ejecuta el endpoint del servicio y se pasa el parametro del dni que se recibio

        this.Apipacientes.getPacientebyDni(params['dni']).subscribe({
          next: data => {
            //se carga el paciente y la vista del complemento
            //this.pacientes = data;
            this.paciente = data;
            //this.paciente = this.pacientes[0];

            console.log(this.paciente);
            this.loading = false;
          }, error: error => {
            console.log(error);
          }
        })
      }, error: error => {
        console.log(error);
      }
    });
  }

  actualizarCambios(dni: string, diagnostico: string): void {
    // Actualiza el diagnóstico del paciente
    this.Apipacientes.putpacienteDiagnostico(dni, diagnostico).subscribe({
      next: () => {
        console.log('Diagnóstico actualizado correctamente');
        setTimeout(() => {
          location.reload();
        }, 1000)
        
      },
      error: error => {
        console.error('Error al actualizar diagnóstico:', error);
        
      }
    });
  }

}
