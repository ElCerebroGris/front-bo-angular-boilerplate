import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { Sample } from '../../models/sample';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-crud-sample',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './crud-sample.component.html',
  styleUrl: './crud-sample.component.css'
})
export class CrudSampleComponent implements OnInit {

  samples: Sample[] = [];
  loading = true;

  constructor(private service: GeneralService){

  }

  ngOnInit(): void {
    this.service.getter('objects').subscribe(
      (res) => {
        this.samples = res;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
