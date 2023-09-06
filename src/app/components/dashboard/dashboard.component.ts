import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ApiService } from 'src/app/services/api.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private authService: AuthService,private api:ApiService,private userStore:UserStoreService){}
  public users:any = [];
  public fullName : string = "";
  public role!:string;
  ngOnInit() {
    this.api.getUsers().subscribe(
      res=>{
        this.users = res;
      });
      this.userStore.getFullNameFromStore()
      .subscribe( val=>{
        let fullNameFromToken = this.authService.getfullNameFromToken();
        this.fullName = val || fullNameFromToken
      });
      this.userStore.getRoleFromStore()
      .subscribe(val=>{
const roleFromToken = this.authService.getRoleFromToken();
this.role = val || roleFromToken;
      });
  }

  logOut()
  {
    this.authService.signOut();

  }

}
