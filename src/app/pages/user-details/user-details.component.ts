import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/shared/user.interface';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: [ './user-details.component.scss' ]
})


export class UserDetailsComponent implements OnInit {
  user!: User;
  userId!: string;
  form!: FormGroup;
  roles: any;

  constructor (private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    // commented out due to error message? - Type 'string | null' is not assignable to type 'string'

    this.userService.findUserById(this.userId).subscribe(res => {
      this.user = res[ 'data' ];
    }, err => {
      console.log(err);
    }, () => {
      this.form.controls[ 'firstName' ].setValue(this.user.firstName);
      this.form.controls[ 'lastName' ].setValue(this.user.lastName);
      this.form.controls[ 'phoneNumber' ].setValue(this.user.phoneNumber);
      this.form.controls[ 'address' ].setValue(this.user.address);
      this.form.controls[ 'email' ].setValue(this.user.email);
    });
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [ null, Validators.compose([ Validators.required ]) ],
      lastName: [ null, Validators.compose([ Validators.required ]) ],
      phoneNumber: [ null, Validators.compose([ Validators.required ]) ],
      address: [ null, Validators.compose([ Validators.required ]) ],
      email: [ null, Validators.compose([ Validators.required ]) ]

    });
  }

  saveUser(): void {
    const updatedUser: User = {
      firstName: this.form.controls[ 'firstName' ].value,
      lastName: this.form.controls[ 'lastName' ].value,
      phoneNumber: this.form.controls[ 'phoneNumber' ].value,
      address: this.form.controls[ 'address' ].value,
      email: this.form.controls[ 'email' ].value
    };

    this.userService.updateUser(this.userId, updatedUser).subscribe({
      next: (res: any) => {
        this.router.navigate([ '/users' ]);
      },
      error: (e: any) => {
        console.log(e);
      }
    });

  }

  cancel(): void {
    this.router.navigate([ '/users' ]);
  }
}
