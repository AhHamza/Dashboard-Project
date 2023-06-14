import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface documentData{
  email:string
  password:string
  username:string
  id:string
  first_name:string
  last_name:string
  phone_number:string
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  isLoading:boolean = false
  email = localStorage.getItem('email')
  password = localStorage.getItem('password')
  
  username:string
  firstName:string
  lastName:string
  phoneNumber:string



ngOnInit(): void {
  this.queryCollection()
}
  constructor(private  firestore: AngularFirestore,private fireauth:AngularFireAuth,private router:Router) { }
  goBack(): void {
    this.isLoading = true
    setTimeout(()=>{
      this.router.navigate(['/sidenavwrapper']);
    },2000)

}
signout(){
  
  this.isLoading = true
  // sign out using authintication
setTimeout(()=>{
  this.fireauth.signOut().then(()=>{
    localStorage.removeItem('email')
    localStorage.removeItem('password')

    this.router.navigate(['/home'])
  })
  },2000)
}
queryCollection(){
  this.firestore.collection('admin').ref
  .where('email' ,'==', this.email)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const documentData =  doc.data() as documentData
      this.email = documentData.email
      this.username = documentData.username
      this.firstName = documentData.first_name
      this.lastName = documentData.last_name

      this.phoneNumber = documentData.phone_number
      console.log(doc.id, ' => ', doc.data());
    });
  })
  .catch((error) => {
    console.log('Error getting documents: ', error);
  });
}

}
