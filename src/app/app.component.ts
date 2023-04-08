import { Component } from '@angular/core';
import { DbService } from './db.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private db: DbService) {}

  avviso: string = '';
  key: string = '';
  stato: number = 0;

  //funzione per l'accesso al teatro
  accesso(key: string) {
	//controllo se l'utente ha inserito una chiave nel form
    if (key == '') {
      return (this.avviso = 'Nessuna chiave inserita');
    }
    this.db.getDb(key).subscribe({
      next: () => {
        this.key = key;
        this.avviso = '';
        this.stato = 1;
      },
      error: (error) => {
        this.avviso = 'La chiave "' + key + '" non esiste';
        console.error(
          'Accesso ha generato un errore: ' + JSON.stringify(error)
        );
      },
    });
  }

  aggiorna_valore(valore) {
    typeof valore == 'string' ? (this.key = valore) : (this.stato = valore);
  }
}
