import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseApiUrl:string = "https://localhost:44377/api/User/";
  constructor(private http:HttpClient) { }
  getUsers(){
    return this.http.get<any>(this.baseApiUrl)
  }
}