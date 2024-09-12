import { Routes } from "@angular/router";
import { AgendaComponent } from "./components/agenda/agenda.component";
import { LoginComponent } from "./components/login/login.component";
import { MockDeskpacientesComponent } from "./components/mock-deskpacientes/mock-deskpacientes.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";
import { RegisterComponent } from "./components/register/register.component";
import { VistapacienteComponent } from "./components/vistapaciente/vistapaciente.component";
import { permissionsGuard } from "./guards/permissions.guard";



export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: MockDeskpacientesComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'calendar', component: AgendaComponent},
    { path: 'pacientes/:dni', component: VistapacienteComponent},
    { path: '**', component: NotFoundComponent }
];
