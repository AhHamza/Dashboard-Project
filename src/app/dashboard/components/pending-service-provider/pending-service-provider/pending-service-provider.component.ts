import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { PendingServiceProviderService } from 'src/app/dashboard/services/pending-service-provider/pending-service-provider.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pending-service-provider',
  templateUrl: './pending-service-provider.component.html',
  styleUrls: ['./pending-service-provider.component.scss']
})
export class PendingServiceProviderComponent implements OnInit {

  
  constructor(private serviceProvider: PendingServiceProviderService, private db:AngularFirestore,private router:Router) { }
  
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
    creation_date:'',
    is_active:false
  }

  addServiceProvider(){
    this.serviceProvider.addServiceProvider(this.serviceProviderTableDetails)
  }

  acceptServiceProvider(id:string){
    this.serviceProvider.acceptServiceProvider(id)
  }

  removeServiceProider(id:string){
this.serviceProvider.deleteServiceProvider(id)
  }

 
  ngOnInit(): void {
    this.db.collection('service_provider').valueChanges().subscribe(val=>console.log(val))
  }
  displayedColumns= [
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
  

  dataSource =  new PendingServiceProviderTableDataSource(this.serviceProvider);
}



export class PendingServiceProviderTableDataSource extends DataSource<any> {
  constructor(private pendingServiceProviderTable : PendingServiceProviderService){
    super()
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.pendingServiceProviderTable.getPendingServiceProviderTable()
}

disconnect(collectionViewer: CollectionViewer): void {
  
}


}
