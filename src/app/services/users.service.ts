import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user,interface';
import { collectionData, collection, doc, Firestore, docData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly firestore: Firestore) {}

  getUsers(): Observable<User[]> {
    const notesRef = collection(this.firestore, 'users');
    return collectionData(notesRef, { idField: 'id'}) as Observable<User[]>;
  }

  getUserById(id:string): Observable<User> {
    const userDocRef = doc(this.firestore, `users/${id}`);
    return docData(userDocRef, { idField: 'id' }) as Observable<User>;
  }
}
