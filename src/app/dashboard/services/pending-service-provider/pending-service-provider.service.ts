import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

interface ServiceProvider{
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

@Injectable({
  providedIn: 'root'
})
export class PendingServiceProviderService {
  
  ngOnInit(): void {
    this.db.collection('service_provider').valueChanges().subscribe(val=>console.log(val))
  } 

  private serviceProviderCollection : AngularFirestoreCollection<ServiceProvider>
  serviceProviders:Observable<ServiceProvider[]>

  constructor(private db:AngularFirestore) {
    this.serviceProviderCollection = db.collection<ServiceProvider>('service_provider')
    this.serviceProviders = this.serviceProviderCollection.valueChanges();
   }

   addServiceProvider(serviceProviderTableDetails:any){
    this.db.collection('service_provider').add(serviceProviderTableDetails).then((docRef)=>{
      console.log('New document added with ID:', docRef.id);
      const docId = docRef.id;
      const docToUpdate = this.db.collection('service_provider').doc(docId);
      docToUpdate.update({ id: docId })
        .then(() => {
          console.log('Document updated with ID:', docId);
        })
        .catch((error) => {
          console.error('Error updating document:', error);
        });
    })
      console.log('done')
   }


   acceptServiceProvider(id:string){
    const docRef = this.db.collection('service_provider').doc(id);
    docRef.update({ is_active: true })
    .then(() => console.log('Attribute updated successfully!'))
    .catch((error) => console.error('Error updating attribute:', error));
  }

  deleteServiceProvider(id:string){
this.serviceProviderCollection.doc(id).delete();
  }

  getPendingServiceProviderTable(){
    return this.db.collection('service_provider',ref =>ref.orderBy('first_name')).valueChanges()
    
  }  
}

