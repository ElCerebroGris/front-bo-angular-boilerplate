import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-crud-sample',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './crud-sample.component.html',
  styleUrl: './crud-sample.component.css'
})
export class CrudSampleComponent {

}
