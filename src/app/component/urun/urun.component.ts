import { Uye } from './../../models/Uye';
import { Kategori } from './../../models/Kategori';
import { Urun } from './../../models/Urun';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FbserviceService } from 'src/app/services/fbservice.service';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { concatMap } from 'rxjs';

@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.css']
})
export class UrunComponent implements OnInit {
  urunler!: Urun[];
  modal!: Modal;
  modalBaslik: string = "";
  kategoriler!: Kategori[]
  secUrun!: Urun
  frm: FormGroup = new FormGroup({
    urunId: new FormControl(),
    adi: new FormControl(),
    aciklama: new FormControl(),
    kategoriId: new FormControl(),
    fiyat: new FormControl(),
    resim: new FormControl(),
  })
  constructor(
    public htoast: HotToastService,
    public route: ActivatedRoute,
    public fbservis: FbserviceService
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.UrunListele();
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ürün Ekle";
    this.modal.show();
  }
  Duzenle(urun: Urun, el: HTMLElement) {
    this.frm.patchValue(urun);
    this.modalBaslik = "Ürün Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(urun: Urun, el: HTMLElement) {
    this.secUrun = urun;
    this.modalBaslik = "Ürün Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    })
  }
  UrunListele() {
    this.fbservis.UrunListele().subscribe(d => {
      this.urunler = d;
    })
  }
  UrunEkleDuzenle() {
    var urun: Urun = this.frm.value;
    if (!urun.urunId) {
      this.fbservis.UrunEkle(urun).then(() => {
      })
      this.modal.toggle();
    } else {
      this.fbservis.UrunDuzenle(urun).then(() => { })
      this.modal.toggle();
    }
  }
  UrunSil() {
    this.fbservis.UrunSil(this.secUrun).then(() => { })
    this.modal.toggle()
  }

  ResimYukle(event: any, urun: Urun) {
    this.fbservis
      .uploadImage(event.target.files[0], `images/urun/${urun.adi}`)
      .pipe(
        concatMap((resim) =>
          this.fbservis.UrunDuzenle({ urunId: urun.urunId, resim })
        )
      )
      .subscribe();
  }
}
