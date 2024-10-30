import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({opacity: 1})),
      transition(':enter', [
        style({opacity: 0}),
        animate(600)
      ])
    ]),
    trigger('fadeInUp', [
      state('in', style({opacity: 1, transform: 'translateY(0)'})),
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(20px)'}),
        animate(600)
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  contactModel: ContactForm = {
    name: '',
    email: '',
    message: ''
  };

  constructor() { }

  ngOnInit(): void {
    // Any initialization logic can go here
  }

  onSubmit() {
    // Here you would typically send the form data to a backend service
    console.log('Form submitted', this.contactModel);
    // Reset the form after submission
    this.contactModel = {
      name: '',
      email: '',
      message: ''
    };

  }
    // You might want to show a success message to the user here
  }
