import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Program } from '../models/program.interface';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  constructor(private readonly firestore: Firestore) { }

  getPrograms(): Observable<Program[]> {
    const programsRef = collection(this.firestore, 'programas');
    return collectionData(programsRef, { idField: 'id'}) as Observable<Program[]>;
  }
}
