const searchButton  = document.querySelector('.search-button');
const keywordForm   = document.getElementById('inputTitle');
searchButton.addEventListener('click', async function() {
    try {
    const inputKeyword = document.querySelector('.input-keyword');
    const movies = await getMovies(inputKeyword.value);
    updateUI(movies);
    } catch (err) {
        alert(err);
    }
});

keywordForm.addEventListener('keypress', async function(e) {
    if (e.key === 'Enter') {
        try {
        const inputKeyword = document.querySelector('.input-keyword');
        const movies = await getMovies(inputKeyword.value);
        updateUI(movies);
        } catch (err) {
            alert(err);
        }
    }
});


function getMovies(keyword) {
    return fetch('http://www.omdbapi.com/?apikey=14f9446f&s=' + keyword)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        })
        .then(response => {
            if (response.Response === 'False') {
                throw new Error(response.Error);
            }
            return response.Search;
        });
}

function updateUI(movies) {
    let cards = '';
    movies.forEach(m => cards += showCard(m));
    const movieContainer = document.querySelector('.movies-container');
    movieContainer.innerHTML = cards;
}


document.addEventListener('click', async function (e) {
    if( e.target.classList.contains('modal-detail-button') ) {
        const imdbid = e.target.dataset.imdbid;
        const movieDetail = await getMovieDetail(imdbid);
        updateUIDetail(movieDetail);
    }
});

function getMovieDetail(imdbid) {
    return fetch('http://www.omdbapi.com/?apikey=14f9446f&i=' + imdbid)
            .then(response => response.json())
            .then(m => m);
}

function updateUIDetail(m) {
    const movieDetail = showMovieDetail(m);
    const modalBody = document.querySelector('.modal-body');
    modalBody.innerHTML = movieDetail;
}



function showCard(m) {
    return `<div class="col-md-4 my-3">
                <div class="card card-border-radius">
                    <img src="${m.Poster}" class="card-img-top poster-border-radius">
                    <div class="card-body ">
                    <h5 class="card-title">${m.Title}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                    <a href="#" class="btn btn-primary modal-detail-button" data-toggle="modal" data-target="#moviesDetailsModal" data-imdbid="${m.imdbID}">Show Details</a>
                    </div>
                </div>
            </div>`;
}

function showMovieDetail(m) {
    
    return `<div class="container-fluid">
                <div class="row">
                <div class="col-md-3">
                    <img src="${m.Poster}" class="img-fluid">
                </div>
                <div class="col-md">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${m.Title} (${m.Year})</h4></li>
                        <li class="list-group-item"><strong>Director : </strong>${m.Director}</li>
                        <li class="list-group-item"><strong>Actors : </strong>${m.Actors}</li>
                        <li class="list-group-item"><strong>Writer : </strong>${m.Writer}</li>
                        <li class="list-group-item"><strong>Plot : </strong> <br>${m.Plot}</li>
                    </ul>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <a class="btn btn-primary" href="https://www.youtube.com/results?search_query=Trailer+${m.Title} (${m.Year})" target="_blank">Get Trailer</a>
                </div>
            </div>`;
}


const chk = document.getElementById('chk');
const h1 = document.querySelector('h1');
const label = document.querySelector('.label');

label.addEventListener('click', function () {
    h1.classList.toggle('dark-h1');
})


chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');
    
});



// SOCIAL PANEL 
const floating_btn = document.querySelector('.floating-btn');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');

floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});

close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});

// Loading animation
$(window).on("load",function(){
    $(".loader-wrapper").fadeOut("slow");
  });

