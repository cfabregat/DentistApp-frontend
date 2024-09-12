import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiPacientesService } from '../../services/api-pacientes.service';
import { Paciente } from '../../interfaces/paciente';

@Component({
  selector: 'app-mock-deskpacientes',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './mock-deskpacientes.component.html',
  styleUrl: './mock-deskpacientes.component.css'
})
export class MockDeskpacientesComponent implements OnInit{
  constructor(private apiPacientes: ApiPacientesService) { }
  Pacientes: Paciente[] = [];

  ngOnInit(): void {
    this.getPacientes();
  }

  getPacientes() {
    this.apiPacientes.getPacientes().subscribe({
      next: data => {
        console.log(data);
        console.log("Ejecutó rutina GetPacientes");
        this.Pacientes = data;
      }, error: error => {
        console.log(error);
      }
    })
  }
}
