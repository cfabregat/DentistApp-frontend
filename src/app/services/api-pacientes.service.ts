import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/paciente';

@Injectable({
  providedIn: 'root'
})
export class ApiPacientesService {

  private _httpCliente = inject(HttpClient);
  constructor() { }

  private apiUrl = 'http://localhost:3000/api/pacientes';

  //Se obtiene el paciente por parametro dni
  getPacientebyDni(dni: string): Observable<any> {
    //return this._httpCliente.get<any>(`${this.apiUrl}/?dni=${dni}`);
    console.log(`${this.apiUrl}/${dni}`);
    return this._httpCliente.get<any>(`${this.apiUrl}/${dni}`);
  }

  //Se obtiene todos los pacientes
  getPacientes(): Observable<Paciente[]> {
    return this._httpCliente.get<Paciente[]>(`${this.apiUrl}`);
  }

  putpacienteDiagnostico(dni: string, diagnostico: string): Observable<Paciente> {
    // Construye el objeto con el diagnóstico actualizado
  
    // Realiza la solicitud PUT al servidor
    return this._httpCliente.put<Paciente>(`${this.apiUrl}/${dni}`, {diagnostico: diagnostico});
  }
  
  
  postPaciente(paciente: Paciente): Observable<Paciente> {
    return this._httpCliente.post<Paciente>(this.apiUrl, paciente);
  }
}
