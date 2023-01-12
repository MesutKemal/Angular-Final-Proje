import { HotToastModule, HotToastService } from '@ngneat/hot-toast';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MytoastService {

  constructor(
    private toast: HotToastService

  ) { }
  ToastUygula(mesaj: string, islem: boolean) {

    if (islem) {
      this.toast.success(mesaj, {
        style: {
          border: '1px solid #0e7309',
          padding: '16px',
          color: '#0e7309',
          borderRadius: '15px',
          font: 'bold',
          timeout: '100'
        },
      });
    } else {
      this.toast.error(mesaj, {
        style: {
          border: '1px solid #a30505',
          padding: '16px',
          color: '#a30505',
          borderRadius: '15px'
        },
      });
    }
  }
}
