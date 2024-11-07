import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, docData } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { catchError, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(private firestore: Firestore) {}

  addDoc(coleccion: string, data: any): Promise<any> {
    const ref = collection(this.firestore, coleccion);
    return addDoc(ref, data).catch(error => {
      console.error(`Error al agregar documento en ${coleccion}:`, error);
      return Promise.reject(error);
    });
  }

  getDocs(coleccion: string): Observable<any[]> {
    const ref = collection(this.firestore, coleccion);
    return collectionData(ref, { idField: 'id' }).pipe(
      catchError(error => {
        console.error(`Error al obtener documentos de ${coleccion}:`, error);
        return of([]);
      })
    );
  }

  getDoc(coleccion: string, id: string): Observable<any> {
    const ref = doc(this.firestore, `${coleccion}/${id}`);
    return docData(ref, { idField: 'id' }).pipe(
      catchError(error => {
        console.error(`Error al obtener documento ${id} en ${coleccion}:`, error);
        return of(null);
      })
    );
  }

  updateDoc(coleccion: string, id: string, data: any): Promise<void> {
    const ref = doc(this.firestore, `${coleccion}/${id}`);
    return updateDoc(ref, data).catch(error => {
      console.error(`Error al actualizar documento ${id} en ${coleccion}:`, error);
      return Promise.reject(error);
    });
  }

  delDoc(coleccion: string, id: string): Promise<void> {
    const ref = doc(this.firestore, `${coleccion}/${id}`);
    return deleteDoc(ref).catch(error => {
      console.error(`Error al eliminar documento ${id} en ${coleccion}:`, error);
      return Promise.reject(error);
    });
  }
}

export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  register(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }
}
