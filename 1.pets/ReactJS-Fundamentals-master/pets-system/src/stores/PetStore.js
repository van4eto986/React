import { EventEmitter } from 'events'
import dispatcher from '../dispatcher'
import PetActions from '../actions/PetActions'
import PetData from '../data/PetData'

class PetStore extends EventEmitter {
  create (pet) {
    PetData
      .create(pet)
      .then(data => this.emit(this.eventTypes.PET_CREATED, data))
  }

  all (page) {
    page = page || 1
    PetData
      .all(page)
      .then(data => this.emit(this.eventTypes.PETS_FETCHED, data))
  }

  details (petId) {
    PetData
      .details(petId)
      .then(data => this.emit(this.eventTypes.PET_DETAILS_SERVED, data))
  }

  commentAdd (petId, newComment) {
    PetData
      .commentAdd(petId, newComment)
      .then(data => this.emit(this.eventTypes.PET_COMMENT_ADDED, data))
  }

  commentsAll (petId) {
    PetData
      .commentsAll(petId)
      .then(data => this.emit(this.eventTypes.PET_COMMENTS_ALL_SERVED, data))
  }

  seedPets (petsSeed) {
    for (let pet of petsSeed) {
      PetData
        .seedPets(pet)
        .then(data => this.emit(this.eventTypes.PET_SEEDED, data))
    }
  }

  handleAction (action) {
    switch (action.type) {
      case PetActions.types.CREATE_PET: {
        this.create(action.pet)
        break
      }
      case PetActions.types.ALL_PETS: {
        this.all(action.page)
        break
      }
      case PetActions.types.DETAILS_PET: {
        this.details(action.petId)
        break
      }
      case PetActions.types.COMMENT_PET: {
        this.commentAdd(action.petId, action.newComment)
        break
      }
      case PetActions.types.COMMENTS_ALL: {
        this.commentsAll(action.petId)
        break
      }
      case PetActions.types.SEED_PETS: {
        this.seedPets(action.petsSeed)
        break
      }

      default:
        break
    }
  }
}

let petStore = new PetStore()

petStore.eventTypes = {
  PET_CREATED: 'pet_created',
  PETS_FETCHED: 'pets_fetched',
  PET_DETAILS_SERVED: 'pets_details_served',
  PET_COMMENT_ADDED: 'pet_comment_added',
  PET_COMMENTS_ALL_SERVED: 'pet_comments_all_served',
  PET_SEEDED: 'pet_seeded'
}

dispatcher.register(petStore.handleAction.bind(petStore))

export default petStore
