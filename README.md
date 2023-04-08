# Progetto d'esame Servizi Sviluppo Web AA 2021/2022
(https://stackblitz.com/edit/angular-4xsjvu?file=README.md)

Specifiche richieste ed eseguite nel progetto finale :

> - Accesso alle prenotazioni per uno spettacolo specifico.
> - Impostazione del nominativo dell'utente.
> - Visualizzazione grafica della disposizione e disponibilità dei posti.
> - Messaggio di conferma di avvenuta prenotazione.
> - Viene verificato se il posto sia effettivamente libero, in tal caso avviene la prenotazione.
> - Un utente può prenotare un unico posto alla volta.
> - Il teatro è configurabile, con una configurazione minima di 2 File e 2 Posti e una massima di 4 File e 10 posti, per non pesare troppo sul database.
> - L'utente prenota un posto e riceve subito la conferma della prenotazione del posto.
> - Quando l'utente inserisce la chiave, viene creato un teatro con le misure default (Platea di 7 file e 10 posti, Palco di 4 file e 6 posti).

Nella cartella app sono presenti quattro file:

- newteatro: un componente che permette di creare un nuovo teatro.
- nominativo: un componente che mostra il nominativo di una persona.
- posto: un componente che visualizza i posti disponibili in un teatro.
- app: il componente principale dell'applicazione, che funge da root component e contiene gli altri componenti.
Inoltre, è presente il file app.module.ts, che definisce il modulo dell'applicazione e ne gestisce le dipendenze.

Infine, è presente il file db.service.ts, che fornisce un servizio per la gestione delle chiamate e delle risposte al database.


#### app.component
- La gestione dell'accesso iniziale al teatro avviene attraverso l'utilizzo di una chiave, la quale può essere generata dall'utente tramite il componente "newteatro" o fornita direttamente da quest'ultimo. Sono stati implementati alcuni controlli per gestire eventuali errori, ad esempio nel caso in cui la chiave non esista o se l'utente non ha inserito il campo obbligatorio prima di confermare la propria scelta.
In aggiunta, è presente una funzione che consente di aggiornare lo stato dell'applicazione, il quale indica la progressione dell'utente all'interno del processo di prenotazione. Tale stato può assumere tre valori distinti: "0" per indicare l'accesso, "1" per indicare l'inserimento del nominativo e "2" per indicare la prenotazione effettiva del posto. Questa funzione può essere richiamata grazie all'utilizzo di un "@Output()" fornito dal componente figlio "newteatro.component".

#### nominativo.component
- La funzione gestisce la procedura di inserimento del nominativo per la prenotazione. Nel caso in cui si passi una chiave non generata da 'newteatro.component', viene utilizzata la configurazione predefinita del teatro. Al contrario, se viene passata una chiave valida come input da 'app.component', viene impostata la configurazione del teatro corrispondente. Successivamente, quando il posto viene prenotato, la pagina HTML viene aggiornata con i dati forniti da 'posto.component', che includono la tipologia di posto selezionato e il nominativo inserito in precedenza tramite l'input '@Input()'.

#### posto.component
- Si occupa di gestire le prenotazioni dei posti selezionati dagli utenti, mostrando una visualizzazione del teatro basata sulla configurazione scelta in precedenza. I posti disponibili sono indicati con il colore verde, mentre quelli già prenotati con il colore rosso. Nel caso in cui un utente tenti di selezionare un posto già occupato, verrà mostrato un avviso contenente il nome dell'utente che ha prenotato quel determinato posto. Dopo aver selezionato e confermato il posto desiderato, l'utente verrà reindirizzato alla pagina nominativo.component con i dati aggiornati. Qui sarà possibile procedere con ulteriori prenotazioni, inserendo il nominativo scelto.

#### newteatro.component
- Gestisce la creazione di un teatro e assicura che rispetti dei criteri specifici, come ad esempio delle misure minime e massime, in modo da non appesantire eccessivamente la memoria del database. Il sistema comunica sia tramite l'annotazione @Input() che tramite @Output() con l'app.component per quanto riguarda la generazione della chiave e l'aggiornamento dello stato. Una volta creato il nuovo teatro e generata la chiave, queste vengono settate insieme in modo da poter passare la chiave al componente nominativo.component già pronta per visualizzare il teatro. La configurazione del teatro viene aggiornata in modo dinamico grazie alla funzione valore_selezionato, e l'utente non è autorizzato a scegliere una configurazione che violi i criteri imposti, grazie alle selezioni già predisposte.


