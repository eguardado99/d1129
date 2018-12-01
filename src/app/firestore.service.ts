import { Injectable } from '@angular/core';

import { Injectable } from '@angular/core'

import { Observable, from } from 'rxjs'
import { map } from 'rxjs/operators'

import{AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore'




@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private boardCollection: AngularFirestoreCollection<Board>

  constructor(private afs: AngularFirestore) {
    this.boardCollection = afs.collection<Board>('books')
  }

  getBoards(): Observable<Board[]> {
    return this.boardCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data()
          const id = a.payload.doc.id
          return { id, ...data }
        }),
      ),
    )
  }

  getBoard(id: string): Observable<any> {
    return this.boardCollection.doc(id).valueChanges()
  }

  