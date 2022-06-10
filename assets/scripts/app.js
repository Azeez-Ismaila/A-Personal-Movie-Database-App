const headerBtn = document.querySelector("header button");
const addModal = document.getElementById("add-modal");
const backdropBtn = document.getElementById("backdrop");
const disableBackdrop = document.getElementById("cancelBtn");
const addMovieBtn = document.getElementById("addBtn");
const userInputs = document.querySelectorAll("input");
const clearMovie = document.getElementById("delete-modal");
const abortDelete = document.getElementById("abortDelete");
let confirmDelete = document.getElementById("confirmDelete");
const movies = [];

const mainText = document.getElementById("entry-text");
const movieList = document.getElementById("movie-list");

const clearWholeMovie = () => {};

const updateUI = () => {
  if (movies.length === 0) {
    mainText.style.display = "block";
  } else {
    mainText.style.display = "none";
  }
};
const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  movieList.children[movieIndex].remove();
  cancelMovieDeletion();
  updateUI();
};
const cancelMovieDeletion = () => {
  clearMovie.classList.remove("visible");
};
const deleteMovieHandler = (movieId) => {
  clearMovie.classList.add("visible");
  abortDelete.removeEventListener("click", cancelMovieDeletion);
  confirmDelete.replaceWith(confirmDelete.cloneNode(true));
  confirmDelete = document.getElementById("confirmDelete");
  abortDelete.addEventListener("click", cancelMovieDeletion);
  confirmDelete.addEventListener("click", deleteMovie.bind(null, movieId));

  // deleteMovie(movieId);
};
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newElement = document.createElement("li");
  newElement.className = "movie-element";
  newElement.innerHTML = `
  <div class = "movie-element__image">
  <img src ="${imageUrl}">
  </div>
  <div class = "movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;
  newElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  movieList.appendChild(newElement);
  clearWholeMovie();
};
const closeMovieModal = () => {};
const toggleMovieModal = () => {
  addModal.classList.toggle("visible");
  toggleBackdrop();
  clearUserInput();
};
const toggleBackdrop = () => {
  backdropBtn.classList.toggle("visible");
};
const cancelBackdrop = () => {
  toggleMovieModal();
};
const backdropClickHandler = () => {
  toggleMovieModal();
  clearUserInput();
};
const clearUserInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter the correct rating between 1 to 5");
  }
  const newMovie = {
    id: Math.random.toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  cancelBackdrop();
  updateUI();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
};

headerBtn.addEventListener("click", toggleMovieModal);
disableBackdrop.addEventListener("click", backdropClickHandler);
backdropBtn.addEventListener("click", cancelBackdrop);
addMovieBtn.addEventListener("click", addMovieHandler);
