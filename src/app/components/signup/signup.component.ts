import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private fb:FormBuilder, private authService:AuthService ,private router:Router){}
signUpForm!:FormGroup;
  type:string = "password";
  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      userName:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
  hideShowPass(){

    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";

  }
  onSignUp(){
    if(this.signUpForm.valid){
      this.authService.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          console.log(res);
          this.router.navigate(['/login']);
          alert(res.message);

        })
      })
      console.log(this.signUpForm.value)
    }else{
      ValidateForm.validateAllFormFields(this.signUpForm)
    }

  }


}
