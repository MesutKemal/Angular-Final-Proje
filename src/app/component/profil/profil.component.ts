import { concatMap } from 'rxjs';
import { Uye } from './../../models/Uye';
import { HotToastService } from '@ngneat/hot-toast';
import { FbserviceService } from 'src/app/services/fbservice.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  uye = this.fbservis.AktifUyeBilgi;
  frm: FormGroup = new FormGroup({
    uid: new FormControl(),
    displayName: new FormControl(),
    tel: new FormControl(),
    email: new FormControl(),
    parola: new FormControl(),
    admin: new FormControl(),
    adres: new FormControl(),
  });
  constructor(
    public fbservis: FbserviceService,
    public htoast: HotToastService

  ) { }

  ngOnInit() {
    this.fbservis.AktifUyeBilgi
      .subscribe((user) => {
        this.frm.patchValue({ ...user });
      });
  }
  Kaydet() {
    this.fbservis
      .UyeDuzenle(this.frm.value)
      .pipe(
        this.htoast.observe({
          loading: 'Güncelleniyor',
          success: 'Güncellendi',
          error: 'Hata Oluştu',
        })
      )
      .subscribe();
  }
  ResimYukle(event: any, user: Uye) {
    console.log("resim yükel")
    this.fbservis
      .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
      .pipe(
        this.htoast.observe({
          loading: 'Fotoğraf Yükleniyor...',
          success: 'Fotoğraf yüklendi',
          error: 'Hata oluştu',
        }),
        concatMap((foto) =>
          this.fbservis.UyeDuzenle({ uid: user.uid, foto })
        )
      )
      .subscribe();
  }
}