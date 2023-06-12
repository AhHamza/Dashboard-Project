import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { ServiceConsumerTableService } from '../../services/service-consumer/service-consumer-table.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-consumer',
  templateUrl: './service-consumer.component.html',
  styleUrls: ['./service-consumer.component.scss']
})
export class ServiceConsumerComponent implements OnInit {


  
    constructor(private serviceConsumer: ServiceConsumerTableService, private db:AngularFirestore,private router:Router) { }
    goBack(): void {
      this.router.navigate(['/sidenavwrapper']);
  
  }
  
    serviceConsumerTableDetails = {
     creation_date:'',
     email:'',
     first_name:'',
     last_name:'',
     locations:[],
     number_of_raters:'',
     password:'',
     phone_number:'',
     profile_pic_url:'',
     rate_ratio:''

    }
  
    ngOnInit(): void {
      this.db.collection('service_consumer').valueChanges().subscribe(val=>console.log(val))
  
    }
  
    displayedColumns = [  'creation_date',
    'email',
    'first_name',
    'last_name',
    // 'locations',
    'number_of_raters',
    'phone_number',
    'rate_ratio'
    ]
  
  
  
    dataSource = new serviceConsumerTableDataSource(this.serviceConsumer);
    
    
  }
  
  
    export class serviceConsumerTableDataSource extends DataSource<any> {
      constructor(private serviceConsumerTable : ServiceConsumerTableService){
        super()
      }
    
      connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.serviceConsumerTable.getServiceCosumerTable()
    }
    
    disconnect(collectionViewer: CollectionViewer): void {
      
    }
    
}
