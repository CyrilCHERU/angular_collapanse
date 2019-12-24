import { UserService } from "./../../services/user.service";
import { User } from "./../../Models/user";
import { Component, OnInit } from "@angular/core";
import { JwtAuthService } from "src/app/authentication/jwt-auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-show",
  templateUrl: "./user-show.component.html",
  styleUrls: ["./user-show.component.css"]
})
export class UserShowComponent implements OnInit {
  user: User;

  constructor(
    private auth: JwtAuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    const userId = this.auth.getUser().id;
    console.log(userId);
    this.userService.find(userId).subscribe(response => {
      this.user = response;
      console.log(this.user);
    });
  }

  handleLogout() {
    this.auth.logout().subscribe(resultat => {
      window.localStorage.removeItem("token");
      this.router.navigateByUrl("/login");
    });
  }
}
