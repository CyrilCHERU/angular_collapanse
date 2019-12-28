import { JwtAuthService } from "./jwt-auth.service";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private auth: JwtAuthService, private router: Router) {}

  /**
   * Surveillance des routes et autorisation des accès
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.auth.isAuthenticated()) {
      return true;
    }

    this.router.navigateByUrl("/login");
    return false;
  }
}
