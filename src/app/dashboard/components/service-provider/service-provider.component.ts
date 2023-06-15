import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { ServiceProviderTableService } from '../../services/service-provider/service-provider-table.service';
@Component({
  selector: 'app-service-provider',
  templateUrl: './service-provider.component.html',
  styleUrls: ['./service-provider.component.scss']
})
export class ServiceProviderComponent implements OnInit {

  constructor(private serviceProvider: ServiceProviderTableService, private db:AngularFirestore,private router:Router) { }
  goBack(): void {
    this.router.navigate(['/sidenavwrapper']);

}
  serviceProviderTableDetails = {
    active_zone:'',
   available_spots:'',
   email:'',
   first_name:'',
   last_name:'',
    national_id:'',
    number_of_raters:'',
    password:'',
    phone_number:'',
    profession:'',
    profile_pic_url:'',
    rate_ratio:'',
    is_active:false

  }

  ngOnInit(): void {
    this.db.collection('service_provider').valueChanges().subscribe(val=>console.log(val))
  }
  displayedColumns=[
    'creation_date',
    'email',
    'first_name',
    'last_name',
    'national_id',
    'number_of_raters',
    'phone_number',
    'profession',
    'rate_ratio',
    'actions'
  ]

  dataSource =  new serviceProviderTableDataSource(this.serviceProvider);

  removeServiceProider(id:string){
    this.serviceProvider.deleteServiceProvider(id)
      }
    
}


export class serviceProviderTableDataSource extends DataSource<any> {
  constructor(private serviceProviderTable : ServiceProviderTableService){
    super()
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.serviceProviderTable.getServiceProviderTable()
}

disconnect(collectionViewer: CollectionViewer): void {
  
}
}
