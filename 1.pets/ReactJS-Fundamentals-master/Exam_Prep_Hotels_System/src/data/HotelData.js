import Data from './Data'

const baseUrl = 'hotels'

class HotelData {
  static createHotel (hotel) {
    return Data.post(`${baseUrl}/create`, hotel, true)
  }

  static allHotels (page) {
    page = page || 1
    return Data.get(`${baseUrl}/all?page=${page}`)
  }

  static detailsHotel (hotelId) {
    return Data.get(`${baseUrl}/details/${hotelId}`, true)
  }

  static reviewHotel (review, rating, hotelId) {
    let body = {
      comment: review,
      rating: rating
    }
    return Data.post(`${baseUrl}/details/${hotelId}/reviews/create`, body, true)
  }

  static reviewsAll (hotelId) {
    return Data.get(`${baseUrl}/details/${hotelId}/reviews`, true)
  }
}

export default HotelData
