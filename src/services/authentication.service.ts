import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserManager, User } from 'oidc-client';

const settings: any = {
  authority: 'https://localhost:5001',
  client_id: 'spa',
  redirect_uri: 'http://localhost:4200/assets/oidc-login-redirect.html',
  post_logout_redirect_uri: 'http://localhost:4200/#/?postLogout=true',
  response_type: 'id_token token',
  scope: 'openid profile api1',
  silent_redirect_uri: `http://localhost:4200/assets/silent-renew.html`,
  accessTokenExpiringNotificationTime: 4,
  // silentRequestTimeout:10000,

  filterProtocolClaims: true,
  loadUserInfo: true,
};

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  mgr: UserManager = new UserManager(settings);
  userLoadededEvent: EventEmitter<User> = new EventEmitter<User>();
  currentUser: User;
  loggedIn = false;

  authHeaders: Headers;

  constructor(private http: HttpClient) {
    this.mgr
      .getUser()
      .then((user) => {
        if (user) {
          this.loggedIn = true;
          this.currentUser = user;
          this.userLoadededEvent.emit(user);
        } else {
          this.loggedIn = false;
        }
      })
      .catch((err) => {
        this.loggedIn = false;
      });
  }

  getUserToken() {
    const data = JSON.parse(sessionStorage.getItem(`token`));
    return data;
  }

  clearState() {
    this.mgr
      .clearStaleState()
      .then(function () {
        console.log('clearStateState success');
      })
      .catch(function (e) {
        console.log('clearStateState error', e.message);
      });
  }

  getUser() {
    this.mgr
      .getUser()
      .then((user) => {
        this.currentUser = user;
        console.log('got user', user);
        this.userLoadededEvent.emit(user);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  removeUser() {
    this.mgr
      .removeUser()
      .then(() => {
        this.userLoadededEvent.emit(null);
        console.log('user removed');
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  startSigninMainWindow() {
    this.mgr
      .signinRedirect({ data: 'some data' })
      .then(function () {
        console.log('signinRedirect done');
      })
      .catch(function (err) {
        console.log(err);
      });
  }
  endSigninMainWindow() {
    this.mgr
      .signinRedirectCallback()
      .then(function (user) {
        console.log('signed in', user);
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  startSignoutMainWindow() {
    this.mgr.getUser().then((user) => {
      return this.mgr
        .signoutRedirect({ id_token_hint: user.id_token })
        .then((resp) => {
          console.log('signed out', resp);
          setTimeout(() => {
            console.log('testing to see if fired...');
          }, 5000);
        })
        .catch(function (err) {
          console.log(err);
        });
    });
  }

  endSignoutMainWindow() {
    this.mgr
      .signoutRedirectCallback()
      .then(function (resp) {
        console.log('signed out', resp);
      })
      .catch(function (err) {
        console.log(err);
      });
  }
}
