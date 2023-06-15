import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppointmentTableService } from '../../services/appointment-table/appointment-table.service';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import firebase from 'firebase/compat/app'; // Import Firebase
import Timestamp = firebase.firestore.Timestamp; // Import Timestamp

@Component({
  selector: 'app-appointment-table',
  templateUrl: './appointment-table.component.html',
  styleUrls: ['./appointment-table.component.scss'],
  providers:[
    DatePipe
  ]
})
export class AppointmentTableComponent implements OnInit {


  constructor(private appointment: AppointmentTableService, private db:AngularFirestore,private router:Router,private datePipe: DatePipe) { }

  goBack(): void {
    this.router.navigate(['/sidenavwrapper']);

}

  ngOnInit(): void {
    this.db.collection('appointment').valueChanges().subscribe(val=>console.log(val))

  }

  convertTimestamp(timestamp: Timestamp): string |null {
    const date = timestamp.toDate(); // Convert the timestamp to a JavaScript Date object
    return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss'); // Apply the date pipe formatting
  }


  displayedColumns = ['appointment_date','create_date','id','client_id','worker_id','details','apartemnt_number','building_number','city','floor_number']




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
