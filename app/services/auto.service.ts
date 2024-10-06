import { inject, Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, docData, setDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  constructor(private firestore: Firestore) {}

  addAutoService(auto: any): Promise<any> {
    const autosCollection = collection(this.firestore, 'autos');
    return addDoc(autosCollection, auto);
  }

  obtenerAutos(): Observable<any[]> {
    const autosCollection = collection(this.firestore, 'autos'); // Accede a la colección
    return collectionData(autosCollection, { idField: 'id' }); // Devuelve los datos
  }

  eliminarAutoService(id: string): Promise<void> {
    const autoDocRef = doc(this.firestore, `autos/${id}`); // Obtén la referencia del documento
    return deleteDoc(autoDocRef); // Elimina el documento
  }

  obtenerAuto(id: string): Observable<any> {
    const autoDocRef = doc(this.firestore, `autos/${id}`);
    return docData(autoDocRef, { idField: 'id' });
  }

  updateAutoService(id: string, auto: any): Promise<void> {
    const autoDocRef = doc(this.firestore, `autos/${id}`);
    return setDoc(autoDocRef, auto, { merge: true }); // Actualiza solo los campos que cambian
  }


}
