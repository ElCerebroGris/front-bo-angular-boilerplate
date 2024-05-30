import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GeneralService } from '../../services/general.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loading = false;

  idSample = '';
  isEditMode = false;

  profileForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private service: GeneralService,
    private auth: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.loading = true;
    let fakeUser = new User();
    fakeUser.id = 'teste';
    this.auth.setLogin(fakeUser);
    this.router.navigate(['/']);

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
  }
}
