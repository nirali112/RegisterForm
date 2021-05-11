import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';

declare var M : any;

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers : [EmployeeService]
})
export class EmployeeComponent implements OnInit {

 constructor(public employeeService : EmployeeService) {}

 ngOnInit(): void {
   this.resetForm();
   this.refreshEmployeeList();  
}

    resetForm(form?: NgForm)
    {
      if(form)
      form.reset();
      this.employeeService.selectedEmployee = {
        id : null , 
        name : "",
        email : "",
        phone_num : null
      }
    }

    onSubmit(form : NgForm)
    {
      if(form.value.id == null){
      this.employeeService.postEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html : 'Saved Successfully', classes: 'rounded'});
      });
    } 
    else{
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
        this.resetForm(form);
        this.refreshEmployeeList();
        M.toast({ html : 'Updated Successfully', classes: 'rounded'});
    });
  }
  }

    refreshEmployeeList()
    {
      this.employeeService.getEmployeeList().subscribe((res) =>
      {
        this.employeeService.employees = res as Employee[];
      });
    }
    
    onEdit(emp : Employee)
    {
      this.employeeService.selectedEmployee = emp;
    }

    onDelete (id : number, form : NgForm)
    {
      if(confirm('Are you sure to delete this record?')== true){
        this.employeeService.deleteEmployee(id).subscribe((res)=>
        {
          this.refreshEmployeeList();
          this.resetForm(form);
          M.toast({html : 'Deleted successfully', classes : 'rounded'});
        });
      }
    }
}
