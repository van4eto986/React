import Data from './Data'

const baseUrl = 'pets'

class PetData {
  static create (pet) {
    return Data.post(`${baseUrl}/create`, pet, true)
  }

  static all (page) {
    page = page || 1
    return Data.get(`${baseUrl}/all?page=${page}`)
  }

  static details (petId) {
    return Data.get(`${baseUrl}/details/${petId}`, true)
  }

  static commentAdd (petId, newComment) {
    return Data.postComment(`${baseUrl}/details/${petId}/comments/create`, newComment, true)
  }

  static commentsAll (petId) {
    return Data.get(`${baseUrl}/details/${petId}/comments`, true)
  }

  static seedPets (pet) {
    return Data.post(`${baseUrl}/create`, pet, true)
  }
}

export default PetData
