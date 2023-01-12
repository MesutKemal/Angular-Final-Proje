import { FormGroup, FormControl } from '@angular/forms';
import { Kategori } from './../../models/Kategori';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FbserviceService } from 'src/app/services/fbservice.service';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { pipe } from 'rxjs';

@Component({
  selector: 'app-kategori_yeni',
  templateUrl: './kategori_yeni.component.html',
  styleUrls: ['./kategori_yeni.component.css']
})
export class Kategori_yeniComponent implements OnInit {
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = '';
  secKategori!: Kategori;
  frm: FormGroup = new FormGroup({
    kategoriId: new FormControl(),
    adi: new FormControl(),
  });

  constructor(public htoast: HotToastService,
    public route: ActivatedRoute,
    public fbservis: FbserviceService) { }

  ngOnInit() {
    this.KategoriListele()
    console.log(this.kategoriler)
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({});
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Kategori Ekle';
    this.modal.show();
  }
  Duzenle(kategori: Kategori, el: HTMLElement) {
    this.frm.patchValue(kategori);
    this.modalBaslik = 'Kategori Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kategori: Kategori, el: HTMLElement) {
    this.secKategori = kategori;
    this.modalBaslik = 'Kategori Sil';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  KategoriListele() {
    this.fbservis.KategoriListele().subscribe(d => {
      this.kategoriler = d
    }
    )
  }
  KategoriEkleDuzenle() {
    var kategori: Kategori = this.frm.value;
    if (!kategori.kategoriId) {
      this.fbservis.KategoriEkle(kategori).then(() => { });
      this.modal.toggle();
    }
    else {
      this.fbservis.KategoriDuzenle(kategori).then(() => {
      });
      this.modal.toggle();
    }
  }


  KategoriSil() {
    this.fbservis.KategoriSil(this.secKategori).then(() => { });
    this.modal.toggle();
  }
}


