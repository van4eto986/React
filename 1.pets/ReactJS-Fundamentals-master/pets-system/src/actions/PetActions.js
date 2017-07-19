import dispatcher from '../dispatcher'

const PetActions = {
  types: {
    CREATE_PET: 'CREATE_PET',
    ALL_PETS: 'ALL_PETS',
    DETAILS_PET: 'DETAILS_PET',
    COMMENT_PET: 'COMMENT_PET',
    COMMENTS_ALL: 'COMMENTS_ALL',
    SEED_PETS: 'SEED_PETS'
  },
  create (pet) {
    dispatcher.dispatch({
      type: this.types.CREATE_PET,
      pet
    })
  },
  all (page) {
    page = page || 1
    dispatcher.dispatch({
      type: this.types.ALL_PETS,
      page
    })
  },
  details (petId) {
    dispatcher.dispatch({
      type: this.types.DETAILS_PET,
      petId
    })
  },
  comment (petId, newComment) {
    dispatcher.dispatch({
      type: this.types.COMMENT_PET,
      petId,
      newComment
    })
  },
  commentsAll (petId) {
    dispatcher.dispatch({
      type: this.types.COMMENTS_ALL,
      petId
    })
  },
  seedPets (petsSeed) {
    dispatcher.dispatch({
      type: this.types.SEED_PETS,
      petsSeed
    })
  }
}

export default PetActions
