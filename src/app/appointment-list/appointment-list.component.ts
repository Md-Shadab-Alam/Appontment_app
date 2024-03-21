import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointment';
@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  
  
  newAppointmentTitle :string = "";
  newAppointmentDate :Date = new Date();
// here we are creating an array of name appointment
  appointments: Appointment[] = []
  
// creating method of a 'Lifecycle Hook' 
// here ngOnInit invoke when this component got initialise 
// that's why this method is perfect for anything related to loding data when the component gets created
  ngOnInit(): void {

  // here we are trying to load something from the local storage
    let saveAppointments = localStorage.getItem("appointments")
    
  // checking if we gave value "Json" expression will invoked
  // and If not then the second part will invoke i.e empty array
  // then putting the value in the "appointment" array
    this.appointments = saveAppointments ? JSON.parse(saveAppointments) :[]
  }

  addAppointment(){
    if(this.newAppointmentTitle.trim().length && this.newAppointmentDate){
    // creating a instance of name "newAppointment" of interface "Appointment"
      let newAppointment: Appointment={
        id:Date.now(),
        title: this.newAppointmentTitle,
        date: this.newAppointmentDate
      }
  
    // pushing the data of the instance into array which we made early
      this.appointments.push(newAppointment)
  
    //clearing the form input 
      this.newAppointmentTitle="";
      this.newAppointmentDate= new Date();
      
    // to store data between servers
      localStorage.setItem("appointments", JSON.stringify(this.appointments))

      //alert(this.appointments.length)
    }
  }

  deleteAppointment(index:number){
  // splice method Removes elements from an array 
    this.appointments.splice(index,1)

  // to store data between servers
    localStorage.setItem("appointments", JSON.stringify(this.appointments))

  }
}
