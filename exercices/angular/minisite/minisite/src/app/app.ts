import { Component, NgModule, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterLink, RouterModule, RouterOutlet, withHashLocation } from '@angular/router';
import { Home } from './home/home';
import { Contact } from './contact/contact';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('minisite');
  
}

