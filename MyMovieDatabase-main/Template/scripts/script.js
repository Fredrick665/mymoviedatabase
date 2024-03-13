"use strict";

let movieData;
let isSingleMovieView = false;
const movieDetailsContainer = document.getElementById('movieDetailsContent');

window.addEventListener('load', () => {
    console.log('load');

    const urlParts = window.location.href.split('?');
    if (urlParts.length > 1) {
        const params = urlParts[1].split('&');
        const imdbIdParam = params.find(param => param.startsWith('imdbid='));
        if (imdbIdParam) {
            const imdbId = imdbIdParam.split('=')[1];
            isSingleMovieView = true;
            // Hämta enskild film med IMDb-ID
            getMovieById(imdbId)
                .then(movie => {
                    // Skapa detaljvy för enskild film
                    renderSingleMovie(movie);
                })
                .catch(error => {
                    console.error('Error fetching movie details:', error);
                });
        }
    } else {
        // Visa filmgalleriet om det inte är en enskild filmvy
        setupCarousel();
        populateMovieData(renderMovies); // Skickar med renderMovies-funktionen som callback
    }
});



function renderMovies(movieData) {
    // Gör något med movieData här
    console.log('Rendering movies:', movieData);

    if (!isSingleMovieView) {
    }
}

function renderSingleMovie(movie) {

    console.log('Rendering single movie:', movie);

    const movieDetailsContainer = document.querySelector('.movie-details');

    // Skapa detaljvy för filmen
    const movieDetails = document.createElement('div');
    movieDetails.className = 'movie-details-content';
    movieDetails.innerHTML = `
        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
        <div class="movie-details">
        <h2>${movie.title} ${movie.year ? `(${movie.year})` : ''}</h2>
            <p>Director: ${movie.director}</p>
            <p>Actors: ${movie.actors.join(', ')}</p>
            ${movie.genre ? `<p>Genre: ${movie.genre}</p>` : ''}
            <p>Plot: ${movie.plot}</p>
            ${movie.imdbRating ? `<p>IMDb Rating: ${movie.imdbRating}</p>` : ''}
            ${movie.runtime ? `<p>Runtime: ${movie.runtime} min</p>` : ''}  
        </div>
    `;
    console.log(movie);

    // Lägg till br efter varje p-element
    const pElements = movieDetails.querySelectorAll('.movie-details p');
    pElements.forEach(p => {
        p.insertAdjacentHTML('afterend', '<br>');
    });

    // Lägg till detaljvy i containern
    movieDetailsContainer.appendChild(movieDetails);
}

// Funktion för att hämta en enskild film med IMDb-ID
async function getMovieById(imdbId) {
    try {
        const response = await fetch(`https://santosnr6.github.io/Data/movies.json`);
        const data = await response.json();

        // Hitta rätt film med IMDb-ID
        const movie = data.find(movie => movie.imdbid === imdbId);

        if (!movie) {
            throw new Error(`Movie with IMDb ID ${imdbId} not found.`);
        }

        // Hämta ytterligare information om filmen från OMDb API
        const detailedMovieInfo = await getDetailedMovieInfo(imdbId);
        Object.assign(movie, detailedMovieInfo);

        return movie;
    } catch (error) {
        console.error('Error fetching movie by ID:', error);
        throw new Error('Error fetching movie by ID.');
    }
}

// Funktion för att hämta detaljerad information om en film från OMDb API
async function getDetailedMovieInfo(imdbId) {
    try {
        const apiKey = "6788cb00"; 
        const apiUrl = `http://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        return {
            actors: data.Actors.split(',').map(actor => actor.trim()),
            director: data.Director,
            plot: data.Plot,  // Lägg till plot här
        };

    } catch (error) {
        console.error('Error fetching detailed movie info:', error);
        return {}; // Returnera ett tomt objekt om det uppstår ett fel
    }
}

// Denna funktion skapar funktionalitet för karusellen
function setupCarousel() {
    console.log('carousel');
    const buttons = document.querySelectorAll('[data-carousel-btn]');
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const offset = btn.dataset.carouselBtn === 'next' ? 1 : -1;
            const slides = btn.closest('[data-carousel]').querySelector('[data-slides]');
            const activeSlide = slides.querySelector('[data-active]');
            let newIndex = [...slides.children].indexOf(activeSlide) + offset;

            if (newIndex < 0) {
                newIndex = slides.children.length - 1;
            } else if (newIndex >= slides.children.length) {
                newIndex = 0;
            }

            // Sätt alla slides till inaktivt tillstånd
            slides.querySelectorAll('[data-active]').forEach(slide => {
                delete slide.dataset.active;
            });

            // Sätt det nya indexet till aktivt tillstånd
            slides.children[newIndex].dataset.active = true;
        });
    });
}

async function populateMovieData(callback) {
    try {
        movieData = await fetch('https://santosnr6.github.io/Data/movies.json').then(response => response.json());

        console.log('Fetched movie data:', movieData);

        const slidesContainer = document.querySelector('[data-slides]');
        const popularCardContainer = document.getElementById('popularCardContainer');

        // Hämta detaljerad information för varje film från OMDb API och uppdatera filmobjekten
        for (const movie of movieData) {
            const detailedMovieInfo = await getDetailedMovieInfo(movie.imdbid);
            Object.assign(movie, detailedMovieInfo);
        }

        // Generera fem slumpmässiga index för att välja fem trailers
        const randomTrailerIndexes = generateRandomIndexes(movieData.length, 5);

        // Loopa över alla filmer
        movieData.forEach((movie, index) => {
            // Skapa trailer list item om indexet finns bland de slumpmässiga trailer-indexen
            if (randomTrailerIndexes.includes(index)) {
                const trailerListItem = document.createElement('li');
                trailerListItem.className = 'carousel__slide';
                trailerListItem.innerHTML = `<iframe src="${movie.trailer_link}" width="420" height="315" frameborder="0"></iframe>`;
                trailerListItem.dataset.active = true;

                // Lägg till trailerListItem i slidesContainer
                if (slidesContainer && trailerListItem) {
                    slidesContainer.appendChild(trailerListItem);
                }
            }

            // Skapa filmkort med article-elementet
            const movieCard = document.createElement('article');
            movieCard.className = 'popular__card';

            // Lägg till bild och titel
            movieCard.innerHTML = `
            <a href="movie.html?imdbid=${movie.imdbid}" class="movie-link">
                <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                <h3 class="popular__card h3">${movie.title}</h3>
            </a>
        `;
        

            // Lägg till movieCard i popularCardContainer om det finns
            if (popularCardContainer && movieCard) {
                popularCardContainer.appendChild(movieCard);

                // Deklarera en global variabel för det valda IMDb-ID
                let selectedImdbId;

                // Eventlyssnare för att hantera klick på filmplakat
                movieCard.addEventListener('click', async () => {
                    // Hämta IMDb-ID från filmobjektet
                    selectedImdbId = movie.imdbid;

                    // Skådespelarinformation från OMDb API
                    const castInfo = await getCastInfo(selectedImdbId);

                    renderMoviePage(movie, castInfo);
                });
            }
        });

        console.log('Movie data populated successfully.');

        // Anropa callback-funktionen med alla filmerna som argument
        if (typeof callback === 'function') {
            callback(movieData);
        }
    } catch (error) {
        console.error('Error fetching or rendering movie data:', error);
    }
}

// Funktion för att generera n slumpmässiga, unika index
function generateRandomIndexes(dataLength, count) {
    const indexes = [];
    while (indexes.length < count) {
        const randomIndex = Math.floor(Math.random() * dataLength);
        if (!indexes.includes(randomIndex)) {
            indexes.push(randomIndex);
        }
    }
    return indexes;
}

// Funktion för att skapa trailer list item
function createTrailerListItem(movie) {
    const trailerListItem = document.createElement('li');
    trailerListItem.className = 'carousel__slide';
    trailerListItem.innerHTML = `<iframe src="${movie.trailer_link}" width="420" height="315" frameborder="0"></iframe>`;
    trailerListItem.dataset.active = true;
    return trailerListItem;
}

// Funktion för att skapa filmkort
function createMovieCard(movie) {
    const movieCard = document.createElement('article');
    movieCard.className = 'popular__card';

    // Händelselyssnare för hover-effekt
    const poster = movieCard.querySelector('.movie-poster');
    poster.addEventListener('mouseover', () => {
        movieCard.style.cursor = 'pointer';
    });

    return movieCard;
}
