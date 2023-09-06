import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import ValidateForm from 'src/app/helpers/ValidateForm';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type:string = "password";
  isText:boolean = false;
  eyeIcon:string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private userStore:UserStoreService){}
  ngOnInit(){
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })
  }
  onLogin(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
   //send object to db
   this.authService.login(this.loginForm.value).subscribe({
    next:(response)=>{
      console.log(response.message);
      // for refreshing the name
      const tokenPayLoad = this.authService.decodedToken();
this.userStore.setFullNameForRole(tokenPayLoad.fullname);
this.userStore.setRoleForStore(tokenPayLoad.role);
     // alert(response.message);
      this.loginForm.reset();
      this.authService.storeToken(response.token);
      this.router.navigate(['dashboard']);
    },
    error:(err)=>{
      alert(
        "error occured"
      )
     console.log(err);
    }

   });

    }
    else{
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("your form is invalid");
      //throw error
    }
  }



  hideShowPass(){

    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text": this.type = "password";

  }

}
