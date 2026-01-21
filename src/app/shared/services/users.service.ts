import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserData } from '@shared/models/user-data.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  requestUrl = 'http://localhost:8083/rest/users';

  createUser(userData: UserData): Observable<UserData> {
    return this.http.post<UserData>(this.requestUrl, userData);
  }

  getUserByEmail(email: string): Observable<UserData> {
    return this.http.get<UserData>(`${this.requestUrl}?email=${email}`);
  }
}
