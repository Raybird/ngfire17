import { AsyncPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, User, authState, signInAnonymously, signInWithPopup, signOut } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { RouterLink } from '@angular/router';
import { EMPTY, Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <p>
      Auth!
      <code>{{ (user | async)?.uid }}</code>
      @if(showLoginButton){
        <button (click)="login()">Log in with Google</button>
      }
      @if(showLoginButton){
        <button (click)="loginAnonymously()">Log in anonymously</button>
      }
      @if(showLogoutButton){
        <p>
          <a [routerLink]="['/index']" routerLinkActive="router-link-active" >go index</a>
        </p>
        <button (click)="logout()">Log out</button>
      }
    </p>
  `,
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{

  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  auth: Auth = inject(Auth);

  showLoginButton = false;
  showLogoutButton = false;

  constructor() {
    if (this.auth) {
      this.user = authState(this.auth);
      this.userDisposable = authState(this.auth).pipe(
        traceUntilFirst('auth'),
        map(u => !!u)
      ).subscribe(isLoggedIn => {
        this.showLoginButton = !isLoggedIn;
        this.showLogoutButton = isLoggedIn;
      });
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.userDisposable) {
      this.userDisposable.unsubscribe();
    }
  }

  async login() {
    return await signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  async loginAnonymously() {
    return await signInAnonymously(this.auth);
  }

  async logout() {
    return await signOut(this.auth);
  }
}
