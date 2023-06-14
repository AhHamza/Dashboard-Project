import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppointmentTableService } from '../../services/appointment-table/appointment-table.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';





@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss'],
  providers:[
  ]
})
export class AppointmentTableComponent implements OnInit {


  constructor(private appointment: AppointmentTableService, private db:AngularFirestore,private router:Router) { }

  goBack(): void {
    this.router.navigate(['/sidenavwrapper']);

}

  ngOnInit(): void {
    this.db.collection('appointment').valueChanges().subscribe(val=>console.log(val))

  }

  displayedColumns = ['appointment_date','client_id','create_date','details','id','location','worker_id']




  dataSource = new appointmentDataSource(this.appointment);
  
}


  export class appointmentDataSource extends DataSource<any> {
    constructor(private appointment : AppointmentTableService,){
      super()
    }
   
  
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
      return this.appointment.getAppointments()
  }
  
  disconnect(collectionViewer: CollectionViewer ): void {
    
  }
  

}

 

// }
