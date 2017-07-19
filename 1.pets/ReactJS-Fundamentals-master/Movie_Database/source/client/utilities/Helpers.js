export default class Helpers {
  static formatMovieRating (score, votes) {
    let rating = score / votes

    if (isNaN(rating)) {  // division by zero is NaN
      rating = 0
    }

    if (rating % 1 !== 0) {
      rating = rating.toFixed(1)
    }

    return rating
  }
}