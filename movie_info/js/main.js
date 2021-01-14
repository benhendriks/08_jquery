$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=4db8c6c1')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">  
              <h5>${movie.Title}</h5>
              <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false; 
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=4db8c6c1')
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnaile">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group"> 
              <liclass="list-group-item"> <strong>Gerne:</strong> ${movie.Gerne}</li>
              <liclass="list-group-item"> <strong>Released:</strong> ${movie.Released}</li>
              <liclass="list-group-item"> <strong>Rated:</strong> ${movie.Rated}</li>
              <liclass="list-group-item"> <strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <liclass="list-group-item"> <strong>Director:</strong> ${movie.Director}</li>
              <liclass="list-group-item"> <strong>Writer:</strong> ${movie.Writer}</li>
              <liclass="list-group-item"> <strong>Actors:</strong> ${movie.Actors}</li>
            </ul> 
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go back</a>
          </div>
        </div>
      `;
    $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}