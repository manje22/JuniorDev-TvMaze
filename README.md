# JuniorDev-TvMaze
Naziv: JDTV
Cilj zadatka je napraviti Next.js stranicu za istraživanje TV serija koja korisniku omogućava:  pregled popularnih TV-serija prikaz detalja serije, popis epizoda, glumce... dodavanje i uklanjanje omiljenih serija

funkcionalnosti:
- pocetna stranica prikazuje serije poredane po ocjeni, vise serija se ucitava pomoću infinite loading-a kada se dosegne kraj
- homepage sadrzi mogucnosti pretrazivanje i filtriranje serija
- klikom na seriju otvara se njeni detaljni prikaz, opcija za dodavanje u favorite (ako nije vec), i izbornik s poveznicama na stranice s epizodama i s glumcima serije. Također je link za stranicu najdrazih serija
- Stranica s prikazom svih glumaca (homepage za glumce) omogučuje pregled glumaca i klikom se otvara njihov detaljan pregled i opcija za dodavanje u favorite
- Na stranici za favorite moguće je uklanjati favorite i prikaz se automatski azurira
- Omogučena je trajna pohrana pomoću Turso i SQLite
- Rute imaju notFound i loading stranice
- stranica je deployana pomoću vercela

Upute za lokalno pokretanje
- git clone, npm install, npm run dev, projekt koristi port 3000 pa je potrebno da bude slobodan

Build i deploy
- sve default naredbe (npm run build)
- link: https://junior-dev-tv-maze-zavrsni-2a70u3qk7-marielas-projects-f5f3e3c6.vercel.app

Poznate greske
- summary text za serije nije dekodiran ispravno
- github authentifikacija (log in) i sve sto je vezano za to ne radi u produkcijskoj verziji (je lokalno)

Planirane nadoknade
- mogučnost authentifikacije na deploy-anoj verziji
- dodatno stiliziranje
- ispravno dekodirati tekst sadrzaj
- dodati pretrazivanje i filtriranje na stranicu za glumce
- dodati vise sadrzaja na stranici za prikaz glumaca
