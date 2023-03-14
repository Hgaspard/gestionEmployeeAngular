import { HttpErrorResponse } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'employeemanagerapp';
  public employees!: Employee[];
  public editEmployee !: Employee;
  public deleteEmployee !: Employee;


  constructor(private employeeService : EmployeeService) { }


  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) =>{
        this.employees = response;
      },
      (error :HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }


  public onOpenModal(employee : Employee, mode : string): void{
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toogle','modal');

      if(mode === 'add'){
        button.setAttribute('data-target', '#addEmployeeModal')
      }
      if(mode === 'edit'){
        button.setAttribute('data-target', '#updateEmployeeModal')
        this.editEmployee=employee;
      }
      if(mode === 'delete'){
        button.setAttribute('data-target', '#deleteEmployeeModal')
        this.deleteEmployee = employee;
      }
      container?.appendChild(button)
      button.click;
  }



}
