import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  isLoading:boolean = false


ngOnInit(): void {
}
  constructor(private router:Router) { }
  goBack(): void {
    this.router.navigate(['/sidenavwrapper']);

}
signout(){
  this.isLoading = true
  // sign out using authintication
setTimeout(()=>{
this.router.navigate(['/home'])

  },2000)
}

}
