import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Paciente } from '../../interfaces/paciente';
import { ApiPacientesService } from '../../services/api-pacientes.service';

@Component({
  selector: 'app-agenda',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.css'
})
export class AgendaComponent implements OnInit {
  //Crea variables desde la interfaz de Paciente
  turnosList : Paciente[] = []
  //Crea un array vacio para los turnos filtrados
  turnosFiltrados: Paciente[] = [];
  selectedDate: string | null = null;

  constructor(private _apiService:ApiPacientesService){}



  ngOnInit(): void {
    this.fetchTurnos();
  }

  fetchTurnos():void{
    this._apiService.getPacientes().subscribe({
      next:data=>{
        this.turnosList = data;
        this.turnosFiltrados = [...this.turnosList];  
      },
      error: err => {
        console.error('Error fetching turnos', err);
      }
    })
  }
  /**
   * 
   * @param dia 
   * Al hacer clic en un dia del calendario va a filtrar por ese dia en particular y buscar los turnos en esa fecha
   */
  /* onDateClick(dia: string): void {
    const fecha = this.formatFecha(dia);
    console.log(fecha);
    this.turnosFiltrados = this.turnosList.filter(turno => turno.fecha_cons === fecha);
    this.selectedDate = dia;
  } */
    onDateClick(event: Event): void {
      console.log(event.target as HTMLInputElement);
      const inputElement = event.target as HTMLInputElement;
      const dia = inputElement.value;
      
      const fecha = this.formatFecha(dia); // Ajusta el formato según tus necesidades
      console.log(fecha);
      
      this.turnosFiltrados = this.turnosList.filter(turno => turno.fecha_cons === fecha);
      this.selectedDate = dia;
  }

  /**
   * 
   * @param dia 
   * Va a formatear el dia escogido y agregarle el mm/yyyy  
   */
  formatFecha(fecha: string): string {
    /* const diaStr = dia < 10 ? `0${dia}` : `${dia}`;
    return `${diaStr}/06/2024`; */
    const [year, month, day] = fecha.split('-');
      // Separar la fecha en día, mes y año
      //const [dia2, mes, año] = dia.split('/');
      return `${year}-${month}-${day}`;
      // Formatear y devolver la nueva fecha en formato yyyy-mm-dd
      //return `2024-06-${dia}`;
    
  }


}
