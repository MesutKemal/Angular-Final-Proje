import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast';
import { FbserviceService } from 'src/app/services/fbservice.service';
import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { MytoastService } from 'src/app/services/mytoast.service';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss']
})
export class UyeComponent implements OnInit {

  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
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
    public htoast: HotToastService,
    public fbservis: FbserviceService
  ) { }


  ngOnInit() {
    this.UyeListele();
  }


  UyeListele() {
    this.fbservis.UyeListele().subscribe(d => {
      this.uyeler = d
    });

  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Üye Ekle";
    this.modal.show();
  }
  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = "Üye Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = "Üye Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }




  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value
    if (!uye.uid) {

      this.fbservis.KayitOl(this.frm.value.email, this.frm.value.parola).pipe(
        switchMap(({ user: { uid } }) =>
          this.fbservis.UyeEkle({
            uid,
            displayName: this.frm.value.displayName,
            // parola: this.frm.value.parola,
            tel: this.frm.value.tel,
            email: this.frm.value.email,
            admin: this.frm.value.admin,
            adres: this.frm.value.adres
          })
        ),
        this.htoast.observe({
          loading: 'Üye Ekleniyor',
          success: 'Üye Eklendi',
          error: ({ message }) => `Hata : ${message}`,
        })
      ).subscribe();
      this.modal.toggle();
    } else {
      this.fbservis.UyeDuzenle(uye).pipe(
        this.htoast.observe({
          loading: "Üye Güncelleniyor",
          success: "Üye GÜncellendi",
          error: ({ message }) => `Hata : ${message}`
        })
      ).subscribe();
      this.modal.toggle();
    }
  }

  UyeSil() {
    this.fbservis.UyeSil(this.secUye).then(() => {

    })
    this.modal.toggle();
  }


  // }
  // UyeSil() {
  //   this.servis.UyeSil(this.secUye.id).subscribe(d => {
  //     this.sonuc.islem = true;
  //     this.sonuc.mesaj = "Kullanıcı Silindi";
  //     this.toast.ToastUygula(this.sonuc);
  //     this.UyeListele();
  //     this.modal.toggle();
  //   });
  // }


}
