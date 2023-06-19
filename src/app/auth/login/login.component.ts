import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit  {
  @ViewChild('email') emailRef:ElementRef
  @ViewChild('password') passwordRef:ElementRef

  email :string
  password :string
  isLoading:boolean = false
  phoneNumber:string
  public isNavigating = false;

  ngOnInit() {
    this.emailRef = new ElementRef(null);
    this.passwordRef = new ElementRef(null);
    
  }


  constructor(private fireauth:AngularFireAuth,private router:Router) {}
  login(){
    this.email = this.emailRef.nativeElement.value.toString()
    this.password = this.passwordRef.nativeElement.value.toString()

    this.fireauth.signInWithEmailAndPassword(this.email,this.password).then(()=>{
      localStorage.setItem('email',this.email);
      localStorage.setItem('password',this.password);

      this.isLoading = true
      console.log(this.email)
      console.log(this.password)
      console.log(this.phoneNumber)
      
      setTimeout(()=>{
      this.router.navigate(['/sidenavwrapper']) //for nabil: type name of dashboard to the component so that the router goes there
      },2000)
      
    },err=>{
      this.isLoading = true
      setTimeout(()=>{
        alert(err.message);
        this.router.navigate(['login'])
        this.isLoading = false

        },2000)
      
    })
  }

  

  goBack(): void {
    this.router.navigate(['/home']);
}
}
