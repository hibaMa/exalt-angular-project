import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import {DataBaseService} from "../services/data-base.service";
import {Router} from "@angular/router"
import {data} from "../locale";
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  userInfo:User;
  isRememberMeChecked = false;
  KeepMeSignedIn = false;
  toggleRememberMe(): void {
    this.isRememberMeChecked = !this.isRememberMeChecked;
  }
  toggleKeepMeSignedIn(): void {
    this.KeepMeSignedIn = !this.KeepMeSignedIn;
  }

  errorMsg:string;
  showErrorMsg=false;

  signInKeyDown(event,userEmail:string,userPass:string){
    if (event.key === "Enter") {
      this.signIn(userEmail,userPass);
    }
  }
  saveToken(token:object):void{
    localStorage.setItem("auth_token",JSON.stringify(token));
  }
  signIn(userEmail:string,userPass:string){
    userEmail=userEmail.trim();
    userPass=userPass.trim();
    if(!userEmail || !userPass){
      alert("please fill all spaces!");
    }
    this.userInfo.username=userEmail;
    this.userInfo.password=userPass;
    this.dataBaseService.getLogInToken(this.userInfo).subscribe(
      (token)=>{
          this.saveToken(token);
          this.showErrorMsg=false;
          this.router.navigate(['/main'])

      },
      (error)=>{
        this.errorMsg =data.english.auth_error_msg;
        this.showErrorMsg=true;
      }
    );

  }
  constructor(private dataBaseService:DataBaseService,private router: Router) { }

  ngOnInit() {
    this.userInfo=new User();
  }

}
