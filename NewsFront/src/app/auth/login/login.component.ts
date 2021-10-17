import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: { username?: string, password?: string } = {};

  constructor(private srvAuth: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  onLogin() {
    if (!this.login.username || !this.login.password) {
      alert('لطفا اطلاعات را وارد کنید')
      return;
    }
    this.srvAuth.login(this.login).subscribe((res: any) => {
      if (!res) {
        alert('نام کاربری یا رمز عبور اشتباه است')
        return;
      }
      localStorage.setItem('token', res.token)
      this.route.navigate(['/home']);
    })
  }

}
