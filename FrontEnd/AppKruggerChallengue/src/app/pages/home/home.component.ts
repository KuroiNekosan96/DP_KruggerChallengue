import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from 'app/components/navbar/navbar.component';

@Component({
  selector: 'app-home',
  imports: [RouterModule,NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
