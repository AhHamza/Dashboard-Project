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
    emailjs.sendForm('service_haui2sl', 'template_081j89j', e.target as HTMLFormElement, 'TAmymcktNtkXUxlUN')
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