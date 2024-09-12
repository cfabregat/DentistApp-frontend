import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../../interfaces/paciente';
import { ActivatedRoute } from '@angular/router';
import { ApiPacientesService } from '../../services/api-pacientes.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  user: Paciente = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: 0,
    fechaNacimiento: '',
    edad: 0,
    genero: '',
    dni: '',
    fecha_cons: '',
    razon_cons: '',
    diagnostico: '',
    usuario: '',
    cobertura: ''
  };

  constructor(
    private route : ActivatedRoute,
    private apiPacienteService: ApiPacientesService
  ){}
  
  ngOnInit(): void {
  
  }

  onSubmit() {
    console.log('Se guardan los datos', this.user);
    this.route.params.subscribe({
      next: params => {
        this.apiPacienteService.postPaciente(this.user).subscribe({
          next:data =>{
            console.log("Data ",data)
          }, error : error => {
            console.log("Error: ", error);
          }
        })
      }, error : error => {
        console.log("Error: ", error);
      }

    }) 
  }

}
