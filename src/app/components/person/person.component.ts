import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPersons();
  }

  submitted:boolean = false;
  personList?: Person[];
  person: Person = {
    firstName:'',
    lastName:''
  };

  
  newPerson(): void {
    this.submitted = false;
    this.person = {
      firstName:'',
      lastName:''
    };
  }

  savePerson(): void {    
    this.personService.save(this.person)
      .subscribe(
        response => {
          if(response.message){
            alert(response.message);
          }
          else{
            this.submitted = true;
            this.getPersons();
          }
        },
        error => {
          error = error.error;
          if(error.message){
            alert(error.message);
          }else if(error){
            alert(error);
          }
        });
  }

  downloadFile(data:any) {    
    const blob = new Blob([data], { type: 'application/json',  });
    const url= window.URL.createObjectURL(blob);
    //window.open(url);
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.className = "hide";
    a.href = url;
    a.download = 'persons.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
  download(){
    this.personService.download().subscribe(
        data => {
          if(data.message)
            alert(data.message);
          this.downloadFile(data);          
        },
        error => {
          error = error.error;
          if(error.message){
            alert(error.message);
          }else if(error){
            alert(error);
          }
        });
  }

  getPersons(): void {
    this.personService.getAll()
      .subscribe(
        data => {
          this.personList = data.data;
          if(data.message)
            alert(data.message);
        },
        error => {
          error = error.error;
          if(error.message){
            alert(error.message);
          }else if(error){
            alert(error);
          }
        });
  }

}
