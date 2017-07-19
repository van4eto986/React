import React from 'react'
import Input from '../common/forms/Input'

const CarCreateForm = (props) => (
  <form>
    <h2>CAR</h2>
    <div>{props.error}</div>

    <Input
      name='make'
      type='text'
      placeholder='Make'
      value={props.car.name}
      onChange={props.onChange} />
    <br />

    <Input
      name='model'
      type='text'
      placeholder='Model'
      value={props.car.name}
      onChange={props.onChange} />
    <br />

     <Input
        name='year'
        type='number'
        placeholder='Year'
        value={props.car.numberOfRooms}
        onChange={props.onChange} />
      <br />

      <Input
        name='engine'
        type='text'
        placeholder='Engine'
        value={props.car.location}
        onChange={props.onChange} />
      <br />

      <Input
        name='price'
        type='number'
        placeholder='Price'
        value={props.car.numberOfRooms}
        onChange={props.onChange} />
      <br />

      <Input
        name='image'
        type='text'
        placeholder='Image'
        value={props.car.image}
        onChange={props.onChange} />
      <br />

      <Input
        name='mileage'
        type='number'
        placeholder='Mileage'
        value={props.car.numberOfRooms}
        onChange={props.onChange} />
      <br />
    
    <input type='submit' onClick={props.onSave} value='Create' />
  </form>
)

export default CarCreateForm
