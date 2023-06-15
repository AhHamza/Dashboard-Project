import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { RequestTableService } from '../../services/request-table/request-table.service';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app'; // Import Firebase
import Timestamp = firebase.firestore.Timestamp; // Import Timestamp
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
  providers:[
    DatePipe,
    RequestTableService,
  ]
})
export class RequestTableComponent implements OnInit {

  
  constructor(private requestTable: RequestTableService, private db:AngularFirestore,private router:Router,private datePipe: DatePipe) { }


  goBack(): void {
    this.router.navigate(['/sidenavwrapper']);
}


convertTimestamp(timestamp: Timestamp): string |null|undefined {
  const date = timestamp.toDate(); // Convert the timestamp to a JavaScript Date object
  return this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss'); // Apply the date pipe formatting
}



  requestTableDetails = {
   client_id:'',
   date:'',
   details:'',
   location:'',
   worker_id:''
  }

  ngOnInit(): void {
    this.db.collection('request').valueChanges().subscribe(val=>console.log(val))
  }

  displayedColumns = ['client_id','create_date','date','details','worker_id','apartemnt_number','building_number','city','floor_number']



  dataSource = new requestTableDataSource(this.requestTable);
  
  
}


  export class requestTableDataSource extends DataSource<any> {
    constructor(private requestTable : RequestTableService){
      super()

    }
  
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
      return this.requestTable.getRequestTable()
  }
  
  disconnect(collectionViewer: CollectionViewer): void {
    
  }
  


}
