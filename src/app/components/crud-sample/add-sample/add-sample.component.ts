import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { Sample } from '../../../models/sample';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sample',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './add-sample.component.html',
  styleUrl: './add-sample.component.css',
})
export class AddSampleComponent implements OnInit {
  sample: Sample = new Sample();
  loading = false;

  idSample = '';
  isEditMode = false;

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
  });

  constructor(
    private service: GeneralService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.idSample = route.snapshot.params['idSample'];
  }

  ngOnInit(): void {
    if (!this.idSample || this.idSample != 'new') {
      this.isEditMode = true;
      this.loadData();
    }
  }

  loadData() {
    this.loading = true;
    this.service.getter('objects/' + this.idSample).subscribe(
      (res) => {
        this.sample = res;
        this.updateProfile();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onSubmit() {
    this.loading = true;

    if (this.isEditMode) {
      this.service
        .patcher('objects/' + this.idSample, this.profileForm.value)
        .subscribe(
          (res) => {
            this.loading = false;
            this.router.navigate(['/sample']);
          },
          (error) => {
            this.loading = false;
          }
        );
    } else {
      this.service.postter('objects', this.profileForm.value).subscribe(
        (res) => {
          this.loading = false;
          this.router.navigate(['/sample']);
        },
        (error) => {
          this.loading = false;
        }
      );
    }
  }

  updateProfile() {
    this.profileForm.patchValue({
      name: this.sample.name,
    });
  }
}
