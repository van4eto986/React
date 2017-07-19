import Data from './Data'

const baseUrl = 'cars'

class CarData {
  static createCar (car) {
    return Data.post(`${baseUrl}/create`, car, true)
  }
  static allCars (page) {
     page = page || 1
     return Data.get(`${baseUrl}/all?page=${page}`)
   }
  static detailsCar (carId) {
    return Data.get(`${baseUrl}/details/${carId}`, true)
  }
  static reviewCar (review, rating, like, carId) {
    let body = {
      comment: review,
      rating: rating,
      like: like
    }
    return Data.post(`${baseUrl}/details/${carId}/reviews/create`, body, true)
  }
  static reviewsAll (carId) {
    return Data.get(`${baseUrl}/details/${carId}/reviews`, true)
  }
}

export default CarData