import { User } from "../../authentication/models/user";
import { JwtAuthService } from "../../authentication/jwt-auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAuthenticated = false;
  user: User;

  constructor(public auth: JwtAuthService, private router: Router) {}

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();

    this.user = this.auth.getUser();

    this.auth.authChanged.subscribe(status => {
      this.isAuthenticated = status;
      this.user = this.auth.getUser();
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
