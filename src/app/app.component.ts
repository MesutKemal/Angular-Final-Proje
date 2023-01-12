import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { FbserviceService } from './services/fbservice.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  uye = this.fbservis.AktifUyeBilgi;
  constructor(

    public fbservis: FbserviceService,
    public router: Router,
    public htoast: HotToastService
  ) { }
  ngOnInit(): void {
  }
  OturumKapat() {
    this.fbservis.OturumKapat().pipe(
      this.htoast.observe({
        loading: "Çıkış Yapılıyor ",
        success: "Çıkış Ypaıldı",
        error: "Çıkış Yapılamadı..."
      })
      ).subscribe();
      this.router.navigate(['/login']);

  }
}
