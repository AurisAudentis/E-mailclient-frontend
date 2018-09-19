import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  private accessKey = "accesskey";

  setAccessKey(key: string) {
    localStorage.setItem(this.accessKey, key);
  }

  getAccessKey() {
    return localStorage.getItem(this.accessKey);
  }

  private refreshKey = "refreshkey";

  setRefreshKey(key: string) {
    localStorage.setItem(this.refreshKey, key);
  }

  getRefreshKey() {
    return localStorage.getItem(this.refreshKey);
  }

  private passwordKey = "passwordkey";

  setPasswordKey(key: string) {
    localStorage.setItem(this.passwordKey, key);
  }

  getPasswordKey() {
    return localStorage.getItem(this.passwordKey);
  }

  setKeys(accesskey: string, refreshkey: string, passwordkey?: string) {
    this.setAccessKey(accesskey);
    this.setRefreshKey(refreshkey);
    passwordkey && this.setPasswordKey(passwordkey);
  }
}
