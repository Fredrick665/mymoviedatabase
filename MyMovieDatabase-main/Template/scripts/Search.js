"use strict";
document.addEventListener("DOMContentLoaded", (function () {
    var headerForm = document.querySelector(".header__flex form");
    var searchBtnMain = headerForm.querySelector(".header__form-btn");
    var searchInputMain = headerForm.querySelector("#searchInputMain");
    var nextPageBtn = document.getElementById("nextPageBtn");
    var prevPageBtn = document.getElementById("prevPageBtn");
    var backToResultsBtn = document.getElementById("backToResultsBtn");
    var totalPagesSpan = document.getElementById("totalPages");
    var searchCountContainer = document.getElementById("searchCount");
    var currentPage = 1;
    var resultsPerPage = 5;

    if (!searchBtnMain || !searchInputMain || !nextPageBtn || !prevPageBtn || !backToResultsBtn || !totalPagesSpan || !searchCountContainer) {
        console.error("Error: One or more elements not found.");
        return;
    }

    // Visa antalet sökträffar
    function displaySearchCount(count) {
        searchCountContainer.innerHTML = "Antal sökträffar: " + count;
    }

    // Visa felmeddelande
    function displayError(message) {
        console.error("Error: " + message);
    }

    // Uppdatera navigering (sida och totalt antal sidor)
    function updateNavigation(currentPage, totalResults) {
        // Använd totalResults här för att uppdatera navigeringen
        var totalPages = Math.ceil(totalResults / resultsPerPage);
        totalPages = isNaN(totalPages) ? 0 : totalPages;

        var currentPageInfo = "Sida " + currentPage + " av " + totalPages;
        totalPagesSpan.textContent = currentPageInfo;

        backToResultsBtn.style.display = currentPage > 1 ? "block" : "none";
    }

    // Hämta och visa sökresultat
    // Deklarera searchButtonClicked här
    var searchButtonClicked = false;

    // Hämta och visa sökresultat
    async function fetchAndDisplayResults() {
        var searchTerm = searchInputMain.value.trim();

        // Kontrollera om sökfältet är tomt
        if (!searchTerm) {
            // Visa felmeddelande endast om användaren inte har skrivit något
            return;
        }

        try {
            var response = await fetch("https://www.omdbapi.com/?apikey=6788cb00&s=" + searchTerm + "&page=" + currentPage);
            var data = await response.json();

            if (data.Response === "False") {
                displayError("No results found. Please try a different search term.");
                return;
            }

            displaySearchResults(data.Search);
            updateNavigation(currentPage, parseInt(data.totalResults)); // Konvertera totalResults till heltal

            // Deklarera searchButtonClicked här
            var searchButtonClicked = false;

            if (searchButtonClicked) {
                searchButtonClicked = false;
            }
        } catch (error) {
            console.error("Error in API call: ", error);
            displayError("Failed to fetch search results. Please try again later.");
        }
    }

    // Visa sökresultaten
    function displaySearchResults(results)  {
        var searchResultsContainer = document.getElementById("searchResultsContainer");

        searchResultsContainer.innerHTML = "";

        if (results) {
            var searchTerm = searchInputMain.value.toLowerCase();

            var relevantResults = results.filter(function (movie) {
                return movie.Type === "movie" && movie.Poster !== "N/A" && movie.Title.toLowerCase().includes(searchTerm);
            });

            relevantResults.forEach(function (movie, index) {
                var movieElement = createMovieElement(movie);

                searchResultsContainer.appendChild(movieElement);

                if ((index + 1) % resultsPerPage === 0) {
                    var clearElement = document.createElement("div");
                    clearElement.style.clear = "both";
                    searchResultsContainer.appendChild(clearElement);
                }
            });
          

            displaySearchCount(relevantResults.length);
        } else {
            displayError("No results found. Please try a different search term.");
        }
    }

    // Skapa sökresultatens HTML-element
    function createMovieElement(movie) {
        var movieElement = document.createElement("article");

        if (movie) {
            movieElement.classList.add("search-result-item");
            movieElement.setAttribute("data-imdbid", movie.imdbID);

            if (movie.Poster && movie.Poster !== "N/A") {
                var posterImg = document.createElement("img");
                posterImg.src = movie.Poster;
                posterImg.alt = movie.Title + " Poster";
                posterImg.setAttribute("data-aos", "zoom-in");

                posterImg.style.width = "60%";
                posterImg.style.height = "auto";

                movieElement.appendChild(posterImg);
            }

            var titleElement = document.createElement("div");
            titleElement.classList.add("movie-title");
            titleElement.textContent = movie.Title;
            movieElement.appendChild(titleElement);
        }

        return movieElement;
    }

    // Hämta och visa sökresultaten vid sidbelastning
    fetchAndDisplayResults();

    // Lyssna på sökknappen
    searchBtnMain.addEventListener("click", function () {
        currentPage = 1;
        searchButtonClicked = true;
        fetchAndDisplayResults();
    });

    // Lyssna på nästa sida-knappen
    nextPageBtn.addEventListener("click", function () {
        currentPage++;
        fetchAndDisplayResults();
    });

    // Lyssna på föregående sida-knappen
    prevPageBtn.addEventListener("click", function () {
        currentPage = Math.max(1, currentPage - 1);
        fetchAndDisplayResults();
    });

    // Lyssna på "Tillbaka till resultat" -knappen
    backToResultsBtn.addEventListener("click", function () {
        currentPage = 1;
        fetchAndDisplayResults();
    });

}));
    AOS.init({
        disable: "mobile",
        duration: 1000,
        easing: "ease-in-out",
        once: true,
        anchorPlacement: "top-center",
        offset: 100
    });