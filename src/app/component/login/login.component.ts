import { HotToastService } from '@ngneat/hot-toast';
import { FbserviceService } from './../../services/fbservice.service';
import { MytoastService } from './../../services/mytoast.service';
import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { UyeComponent } from '../uye/uye.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = "";
  secUye!: Uye;
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    numara: new FormControl(),
    adsoyad: new FormControl(),
    mail: new FormControl(),
    nick: new FormControl(),
    admin: new FormControl(),
    parola: new FormControl(),
    kaytarih: new FormControl(),
    odev: new FormControl()
  });

  constructor(
    // public toast: MytoastService,
    public toast: HotToastService,
    public fbservis: FbserviceService,
    public router: Router
  ) { }

  ngOnInit() {
    // this.UyeListele();
  }
  OturumAc(mail: string, parola: string) {
    this.fbservis.OturumAc(mail, parola).pipe(
      this.toast.observe({
        loading: "Oturum Açılıyor...",
        success: "Oturum Açıldı",
        error: ({ message }) => `Hata var : ${message}`
      })
    ).subscribe(() => {
      this.router.navigate([""]);
    })


  }
  GoogleGiris() {
    this.fbservis.GoogleKayit().pipe(
      this.toast.observe({
        loading: "Oturum Açılıyor...",
        success: "Oturum Açıldı",
        error: ({ message }) => `Hata var : ${message}`
      })
    ).subscribe(() => {
      this.router.navigate([""]);
    })

  }

  // Ekle(el: HTMLElement) {
  //   this.frm.reset();
  //   this.frm.patchValue({ admin: 0 });
  //   this.modal = new bootstrap.Modal(el);
  //   this.modalBaslik = "Kullanıcı Ekle";
  //   this.modal.show();
  // }

  // UyeListele() {
  //   this.servis.UyeListele().subscribe(d => {
  //     this.uyeler = d;
  //   });
  // }

  // OturumAc(nick: string, parola: string) {
  //   this.dataServis.OturumAc(nick, parola).subscribe(d => {
  //     if (d.length > 0) {
  //       var kayit: Uye = d[0];
  //       localStorage.setItem("adsoyad", kayit.adsoyad);
  //       localStorage.setItem("admin", kayit.admin.toString());
  //       location.href = "/";
  //     } else {
  //       var s: Sonuc = new Sonuc();
  //       s.islem = false;
  //       s.mesaj = "Kullanıcı Adı veya Parola Geçersizdir!";
  //       this.toast.ToastUygula(s);
  //     }
  //   });
  // }

  // UyeEkleDuzenle() {
  //   var uye: Uye = this.frm.value
  //   var tarih = new Date();
  //   if (!uye.id) {
  //     var filtre = this.uyeler.filter(s => s.mail == uye.mail);
  //     if (filtre.length > 0) {
  //       this.sonuc.islem = false;
  //       this.sonuc.mesaj = "Girilen E-Posta Adresi Kayıtlıdır!";
  //       this.toast.ToastUygula(this.sonuc);
  //     } else {
  //       uye.kaytarih = tarih.getTime().toString();
  //       this.servis.UyeEkle(uye).subscribe(d => {
  //         this.sonuc.islem = true;
  //         this.sonuc.mesaj = "Başarıyla Kayıt Olundu!";
  //         this.toast.ToastUygula(this.sonuc);
  //         this.UyeListele();
  //         this.modal.toggle();
  //       });
  //     }
  //   } else {
  //     this.servis.UyeDuzenle(uye).subscribe(d => {
  //       this.sonuc.islem = true;
  //       this.sonuc.mesaj = "Kullanıcı Düzenlendi";
  //       this.toast.ToastUygula(this.sonuc);
  //       this.UyeListele();
  //       this.modal.toggle();
  //     });
  //   }

  // }
}
