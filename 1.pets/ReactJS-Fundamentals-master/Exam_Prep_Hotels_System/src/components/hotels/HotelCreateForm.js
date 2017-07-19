import React from 'react'
import Input from '../common/forms/Input'

const hotelCreateForm = (props) => (
  <form>
    <h2>hotel create form</h2>
    <div>{props.error}</div>

    <Input
      name='name'
      type='text'
      placeholder='Name'
      value={props.hotel.name}
      onChange={props.onChange} />
    <br />

      <Input
        name='location'
        type='text'
        placeholder='Location'
        value={props.hotel.location}
        onChange={props.onChange} />
      <br />

      <Input
        name='description'
        type='text'
        placeholder='Description'
        value={props.hotel.description}
        onChange={props.onChange} />
      <br />

      <Input
        name='numberOfRooms'
        type='number'
        placeholder='Number of Rooms'
        value={props.hotel.numberOfRooms}
        onChange={props.onChange} />
      <br />

      <Input
        name='image'
        type='text'
        placeholder='Image'
        value={props.hotel.image}
        onChange={props.onChange} />
      <br />

      <Input
        name='parkingSlots'
        type='number'
        placeholder='ParkingSlots'
        value={props.hotel.parkingSlots}
        onChange={props.onChange} />
      <br />

    <input type='submit' onClick={props.onSave} value='Create Hotel' />
  </form>
)

export default hotelCreateForm
