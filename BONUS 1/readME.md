**BONUS 1**

__milestone 1__
- evitare che l'utente possa inviare un messaggio vuoto o composto solamente da spazi

__milestone 2__
- cambiare icona in basso a destra (a fianco all'input per scrivere un nuovo messaggio) finché l'utente sta scrivendo: di default si visualizza l'icona del microfono, quando l'input non è vuoto si visualizza l'icona dell'aeroplano. Quando il messaggio è stato inviato e l'input si svuota, si torna a visualizzare il microfono.

__milestone 3__
- inviare quindi il messaggio anche cliccando sull'icona dell'aeroplano

__milestone 4__
- predisporre una lista di frasi e/o citazioni da utilizzare al posto della risposta "ok:" quando il pc risponde, anziché scrivere "ok", scegliere una frase random dalla lista e utilizzarla come testo del messaggio di risposta del pc
    - potrei semplicemente aggiungere una lista di messaggi e pescare a caso dalla lista per poi implementarlo nel mio codice nella funzione sendMessage
    - voglio farne una versione più complicata:
      - quando ricevi un messaggio controlla tra tutte le chat se esiste un messaggio uguale e in caso di risposta affermativa invia la risposta corrispondente (il limite attuale è che se vengono mandati due messaggi sconnessi logicamente tra loro dalla stessa persona di fila la risposta equivale al secondo messaggio e non alla risposta della persona diversa. TO FIX)

__milestone 5__
- sotto al nome del contatto nella parte in alto a destra, cambiare l'indicazione dello stato: visualizzare il testo "sta scrivendo..." nel timeout in cui il pc risponde, poi mantenere la scritta "online" per un paio di secondi e infine visualizzare "ultimo accesso alle xx:yy" con l'orario corretto