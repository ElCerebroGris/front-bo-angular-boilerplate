import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { Sample } from '../../../models/sample';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-add-sample',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './add-sample.component.html',
  styleUrl: './add-sample.component.css'
})
export class AddSampleComponent implements OnInit {

  sample: Sample = new Sample;
  loading = false;

  constructor(private service: GeneralService){

  }

  ngOnInit(): void {
    this.service.getter('objects').subscribe(
      (res) => {
        this.sample = res;
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
