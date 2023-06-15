import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface Appointments{
  RATE_VALUE:string,
  REQ_ID:string,
  REVIEW:string
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentTableService implements OnInit {
  ngOnInit(): void {
    this.db.collection('appointment').valueChanges().subscribe(val=>console.log(val))
  } 

  constructor(private db:AngularFirestore) { 
    
  }

  getAppointments(){
    return this.db.collection('appointment',ref =>ref.orderBy('client_id')).valueChanges()
  }
}
