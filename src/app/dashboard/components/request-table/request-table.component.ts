import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { RequestTableService } from '../../services/request-table/request-table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
  providers:[
    RequestTableService
  ]
})
export class RequestTableComponent implements OnInit {

  
  constructor(private requestTable: RequestTableService, private db:AngularFirestore,private router:Router) { }


  goBack(): void {
    this.router.navigate(['/sidenavwrapper']);
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

  displayedColumns = ['client_id','date','details','worker_id','location']



  dataSource = new requestTableDataSource(this.requestTable);
  
  
}


  export class requestTableDataSource extends DataSource<any> {
    constructor(private requestTable : RequestTableService){
      super()
    let json = JSON

    }
  
    connect(collectionViewer: CollectionViewer): Observable<any[]> {
      return this.requestTable.getRequestTable()
  }
  
  disconnect(collectionViewer: CollectionViewer): void {
    
  }
  


}
