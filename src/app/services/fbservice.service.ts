import { Urun } from 'src/app/models/Urun';
import { Kategori } from './../models/Kategori';
import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, setDoc, updateDoc, where, query } from '@angular/fire/firestore';
import { Observable, of, switchMap, pipe, from } from 'rxjs';
import { Uye } from '../models/Uye';
import { getDownloadURL, ref, uploadBytes, Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class FbserviceService {
  aktifUye = authState(this.auth);
  constructor(public fs: Firestore, public auth: Auth, public storage: Storage) { }

  GoogleKayit() {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider))
  }
  KayitOl(mail: string, parola: string) {
    return from(createUserWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumAc(mail: string, parola: string) {
    return from(signInWithEmailAndPassword(this.auth, mail, parola));
  }
  OturumKapat() {
    return from(this.auth.signOut());
  }

  get AktifUyeBilgi() {
    return this.aktifUye.pipe(
      switchMap((user) => {
        if (!user?.uid) {
          return of(null);
        }
        const ref = doc(this.fs, 'Uyeler', user?.uid);
        return docData(ref) as Observable<Uye>;
      })
    );
  }

  UyeListele() {
    var ref = collection(this.fs, "Uyeler");
    return collectionData(ref, { idField: 'uid' }) as Observable<Uye[]>;
  }
  UyeEkle(uye: Uye) {
    var ref = doc(this.fs, 'Uyeler', uye.uid);
    return from(setDoc(ref, uye));
  }
  UyeDuzenle(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return from(updateDoc(ref, { ...uye }));
  }
  UyeSil(uye: Uye) {
    var ref = doc(this.fs, "Uyeler", uye.uid);
    return deleteDoc(ref);
  }

  KategoriListele() {
    var ref = collection(this.fs, "Kategoriler");
    return collectionData(ref, { idField: 'kategoriId' }) as Observable<Kategori[]>;
  }
  KategoriEkle(kategori: Kategori) {
    var ref = collection(this.fs, 'Kategoriler');
    return addDoc(ref, kategori);
  }
  KategoriDuzenle(kategori: Kategori) {
    var ref = doc(this.fs, 'Kategoriler/' + kategori.kategoriId);
    return updateDoc(ref, { ...kategori });
  }
  KategoriSil(kategori: Kategori) {
    var ref = doc(this.fs, "Kategoriler/" + kategori.kategoriId);
    return deleteDoc(ref);
  }

  UrunListele() {
    var ref = collection(this.fs, "Urunler");
    return collectionData(ref, { idField: 'urunId' }) as Observable<Urun[]>;
  }
  // UrunById(urId: string) {
  //   var ref = collection(this.fs, "Urunler");
  //   const sorgu = query(ref, where("urunId", "==", urId))
  //   return collectionData(sorgu, { idField: 'urunId' });
  // }
  UrunEkle(urun: Urun) {
    var ref = collection(this.fs, 'Urunler');
    return addDoc(ref, urun);
  }
  UrunDuzenle(urun: Urun) {
    var ref = doc(this.fs, 'Urunler/' + urun.urunId);
    return updateDoc(ref, { ...urun });
  }
  UrunSil(urun: Urun) {
    var ref = doc(this.fs, "Urunler/" + urun.urunId);
    return deleteDoc(ref);
  }
  uploadImage(image: File, path: string): Observable<string> {
    const storageRef = ref(this.storage, path);
    const uploadTask = from(uploadBytes(storageRef, image));
    return uploadTask.pipe(switchMap((result) => getDownloadURL(result.ref)));
  }
}
