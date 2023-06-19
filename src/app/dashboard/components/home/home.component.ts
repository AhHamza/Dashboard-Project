import { Component } from '@angular/core';
import { Router } from '@angular/router';
import emailjs,{EmailJSResponseStatus} from '@emailjs/browser'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  isExpanded: boolean = false;

  public sendEmail(e: Event) {
    e.preventDefault();
    emailjs.sendForm('service_o7s0jlv', 'template_usmjp3c', e.target as HTMLFormElement, 'AQti0Uc4nYeocz2Sy')
      .then((result: EmailJSResponseStatus) => {
        console.log(result.text);

      }, (error) => {
        console.log(error.text);
      });
  }

  
  constructor(private router: Router) { }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  
}