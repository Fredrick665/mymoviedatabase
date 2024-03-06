![logo](/Template/res/logo.png)

# Individuellt examensarbete - MyMovieDatabase

## Introduktion
Hej där, kodmästare! Det är dags att sätta på våra virtuella regissörskepsar och börja rulla kameran på vår egen version av en klassisk filmindustri-epos - vår alldeles egna filmdatabas! Vi har tränat, vi har kodat och nu är det dags att visa världen vad vi kan åstadkomma med våra HTML-, CSS-, och framförallt JavaScript-färdigheter. Så spänn fast era säkerhetsbälten och förbered er på en episk resa genom bland annat funktioner, objekt, eventhantering och API-anrop. Tillsammans kommer vi att skapa en filmälskares våta dröm och bevisa att när det gäller kod, så finns det - likt i filmens värld - inga gränser för vad vi kan uppnå!

## Instruktioner

### Uppgift
Ditt uppdrag är att skapa en webbapplikation som liknar IMBD (Internet Movie Database) där användare kan söka efter filmer, visa detaljerad information om filmer och lägga till sina favoritfilmer med mera.

Exempelfilm på hur webbapplikationen kan se ut [hittar ni här](https://vimeo.com/913498023/07076d7fb8?share=copy).
Exempelbilder [hittar ni här](https://drive.google.com/file/d/17IRL7YcKr1dmxWuonzDkxwqbK_L5zBxM/view?usp=sharing), [här](https://drive.google.com/file/d/1ITrGvpT0W7VHCXCIaiV0GEVUumYTpo8K/view?usp=sharing), och [här](https://drive.google.com/file/d/1VEQ-GzUmK1SAw_3ISlyY8ZBgLNXgeB9u/view?usp=sharing).

### Tekniska Krav
#### För godkänt
* På startsidan MÅSTE ni presentera 5 slumpmässiga trailers, samt hela topplistan för IMDBs 20 högts rankade filmer. Denna information läser ni in från [mitt filmAPI](https://santosnr6.github.io/Data/movies.json).
* Det MÅSTE finnas sökfunktionalitet. Vid sökning skall strängen från inputfältet användas för att göra en bred sökning i [OMDB-APIet](https://www.omdbapi.com/).
* Sökresultaten MÅSTE presenteras för användaren på ett tillfredsställande sätt där ni exempelvis kan skapa ett "kort" per film innehållandes titeln, samt en poster. (Det är också tillåtet att presentera sökresultaten i en automatisk lista med förslag på den input som användaren skriver in i sökfältet)
* Vid klick på ett sökresultat MÅSTE ni göra en ny, mer specifik sökning på [OMDB-APIet](https://www.omdbapi.com/) göras, baserat på den klickade filmens ImdbID. (Mer info om de olika sökningarna för APIet kommer nedan). Detta anrop kommer returnera mer specifik information om filmen som ni skall presentera för användaren (antingen på startsidan, eller på en egen sida).
* Ni MÅSTE koda tillgängligt, dvs. alla bilder måste ha ALT-taggar, överanvänd inte DIV-element där de inte fyller någon funktion osv. Er sida kommer att granskas med ett tillgänglighetsverktyg (se nedan), där onödiga övertramp och Errors inte kommer att godkännas.
* Ni MÅSTE använda er av felhantering vid era API-anrop.
* Ni MÅSTE skapa en responsiv webbplats. Inga element får sticka ut över kanter, eller utanför skärmen.
* Er webbplats MÅSTE ha ett acceptabelt utseende (ni får använda mitt template).

#### För Väl Godkänt
* Skapa funktionalitet för att lägga till/ta bort filmer i en favoritlista (använd localStorage för detta). Dessa filmer skall även kunna visas för användaren (tex som i mitt exempel, men kan även göras på en ny sida).
* Använda er av MINST 2 moduler utöver er huvudjavascript-fil (alltså minst 3 javascript-filer totalt).

### Verktyg/Resurser
#### santosnr6.github.io
Mitt eget film-API är endast till för att ladda upp de inledande filmerna, samt trailers på startsidan innan användaren gör sin sökning. Mitt API [hittar ni här](https://santosnr6.github.io/Data/movies.json).

#### OMDB
För att använda er av OMDBs film-API så behöver ni först av allt ansöka om en api-nyckel. Detta [hittar ni gratis här](https://www.omdbapi.com/apikey.aspx). 
OMDBs film-API består av två olika typer av sökningar, bred och specifik. Den breda sökningen görs med en sträng som parameter och kommer att returnera de 10 första/bästa träffarna. Den breda sökningen innehåller inte särskilt mycket information utan bara det mest väsentliga som titel, poster, imdb-ID mm. URL för den breda sökningen:
```
http://www.omdbapi.com/?apikey=[yourkey]&s=[söksträng]
```
För att göra den mer specifika sökningen behöver ni använda er av det imdb-ID som den första sökningen genererade. Denna specifika sökning kommer att returnera mer specifik information om en specifik film. URL för den specifika sökningen:
```
http://www.omdbapi.com/?apikey=[yourkey]&plot=full&i=[imdb-ID]
```

#### Postman
Postman är ett kraftfullt verktyg för att testa GET-anrop mot APIer på grund av dess intuitiva gränssnitt som möjliggör enkel och snabb hantering av HTTP-förfrågningar och svar. Det ger användarna möjlighet att skicka anpassade GET-förfrågningar till olika slutpunkter, visa svar i läsbar form och analysera svarsstatus, huvuden och kroppar för att validera API-beteende. Nedladdningslänk för Postman [hittar ni här](https://www.postman.com/downloads/).

#### WAVE Evaluation Tool
WAVE evaluation tool är användbart för att kontrollera tillgänglighet eftersom det identifierar tillgänglighetsproblem på webbsidor och ger användare detaljerade rapporter och rekommendationer för att förbättra tillgängligheten för människor med funktionsnedsättningar, vilket möjliggör för webbutvecklare att skapa mer tillgängliga och användarvänliga webbsidor. Installationslänk för tillägget [hittar ni här](https://chromewebstore.google.com/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh).

#### Template
I mappen finner ni även en template som ni får använda er av om ni vill. I denna har jag kodat upp basen för applikationen, dess färgtema, funktionalitet för en karusell med trailers osv. Ni får jättegärna använda er av denna, men det är även tillåtet att skapa ert eget projekt från scratch. Kom dock ihåg att er applikation MÅSTE vara visuellt acceptabel.

### Inlämning
Inlämning av länken till ert publika Git-repo skall ske senast kl 23:59, söndagen den 3 mars på Azomo.

### Examination
Denna gång bedöms ni endast på er inlämning. Ingen presentation eller seminarium.
