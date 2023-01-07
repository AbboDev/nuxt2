# Test tecnico - Iliad

## Comandi

```bash
# Installa le dipendenze
$ npm install

# Avvia Nuxt in modalità HMR sulla porta 3000
$ npm run dev

# Genera il sito statico
$ npm run generate

# Compila il sito ed avvia il server Node
$ npm run build
$ npm run start

# Avvia il server JSON con le API per le regioni, le province e le città Italiane
$ npm run server
```

## Dettagli

L'applicativo si basa su Nuxt 2, Vue e Balm UI.
La versione di Node impiegata è la 16.
La versione utilizzata di Vue è la 2 tramite la Options API.
È stato impiegato TypeScript, senza però l'impiego della libreria per i decoratori dei componenti Vue.
Lo store manager impiegato è Vuex, essendo preinstallato in Nuxt 2.

### Note

È possibile usare Docker per lo sviluppo, principalmente per la costanza della versione di Node.
Sarà necessario creare il container con il docker compose è poi lanciare solo i servizi `nuxt-dev` e `server`

Ad ogni commit verrà scansionato il codice con Eslint e Stylelint.
A differenza della configurazione iniziale offerta da Nuxt, ho impostato che venga automaticamente sistemato da Prettier, anziché solo controllato

L'applicazione è stata sviluppata per funzionare senza server, siccome l'idea era di caricarla su un ambiente privo di NodeJS
Di conseguenza, i compilati statici non permettono il server side rendering, siccome sono presenti più sezioni dinamiche

### Todo

- ~~Agganciare Netlify~~: [https://nuxt-2-test.netlify.app/](https://nuxt-2-test.netlify.app/)

## Task

- **Login** \*
  Il login è stato sviluppato senza librerie, usando le Web Storage API per salvare il token e l'account ottenuto, così da mantenere l'accesso durante la navigazione del sito, il refresh della pagina e la chiusura del browser
- **Registrazione utente (Nome, Cognome, Data nascita, Città nascita, Codice Fiscale, ecc.)** \*
  La validazione dei campi è stata delegata principalmente ai componenti di Balm UI e al browser tramite gli attributi HTML.
  Gli unici controlli applicati sono sull'uguaglianza dei due campi password e sulla presenza della data di nascita, non gestita dal rispettivo componente
  L'invio alle fake API avviene con successo, ma si riceverà un errore via Toast siccome il login sarà impossibile, siccome l'utente non viene in realtà registrato
- **Form indirizzo di spedizione** \*
  Come per il task precedente, la validazione dei campi viene delegata ai campi nativi ed alla libreria.
  Viene però impiegato un server basato su un JSON con tutte le regioni, le province e le città Italiane fino al 2022 (non sono riuscito a reperire API free).
  Alla scelta della regione, vengono ricaricate le province, così come al cambio di provincia vengono caricate le città coi loro CAP.
  È stata fatta una piccola operazione di memoizzazione per salvarsi tutte le regioni e poi le relative province e città scelte.
  I campi già associati all'account vengono iniettati dallo store durante la creazione del componente
- **Tabella con operazioni CRUD sugli elementi e ricerca server side** \*
  Sono state create quattro pagine:
  - una di **R**ead di tutti i posts, stampati in una tabella con paginazione
    - all'interno di questa di potrà andare alla pagina di modifica o di visualizzazione
    - si potrà effettuare per ciascun post la **D**elete asincrona
    - si potrà fare la **D**elete di più articoli selezionandoli
    - si può lanciare la ricerca **O** testuale sul titolo dell'articolo **OPPURE** sull'utente, ma non su entrambi (limite dettato dalle API esterne)
  - una per la **R**ead del singolo post
  - una per la **C**reate dei nuovi post (**NOTA:** al seguito della "creazione", si andrà alla 404 perché il componente fa il redirect verso la pagina di visualizzazione del nuovo articolo, che in realtà non esiste)
  - una per l'**U**pdate degli articoli già esistenti
- **Integrazione di un JavaScript Testing Framework e.g. JEST** (opzionale)
  In corso d'opera.
  Verrà impiegata la libreria [Vue Test Utils](https://v1.test-utils.vuejs.org/), basata su Jest

## Riferimenti

- [Nuxt 2](https://nuxtjs.org/): Ho optato di usare la v2 piuttosto che la v3 per due motivi:
  - quest'ultima è stata rilasciata la prima versione stabile il 16 Nov 2022, come [da questo articolo ufficiale](https://nuxt.com/v3)
  - essendo la major release stata rilasciato quest'anno, è più probabile dover mettere mano a codice scritto con la v2 che con la v3
- [Balm UI](https://v8.material.balmjs.com/#/): Ho optato per questa libreria piuttosto che quelle più famose (PrimeVue, Vuetify, quelle basate sui più comuni framework CSS) attirato dall'impiego del Material Design. Solo a sviluppi inoltrati, ho constatato una carenza di funzionalità in questa libreria.
- [dummyJSON](https://dummyjson.com/): Fake API usata le operazioni di login, registrazione, spedizione e le operazioni sulla tabella CRUD
- [Angular Commit Message Format](https://gist.github.com/brianclements/841ea7bffdb01346392c)
