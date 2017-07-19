import React from 'react'

const RegisterForm = (props) => (
  <form>
    <div>{props.error}</div>
    <label htmlFor='email'>Email</label>
    <input
      type='email'
      name='email'
      placeholder='Email'
      value={props.user.email}
      onChange={props.onChange}
    />
    <br />
    <label htmlFor='password'>Password</label>
    <input
      type='password'
      name='password'
      placeholder='password'
      value={props.user.password}
      onChange={props.onChange}
    />
    <br />
    <label htmlFor='confirmPassword'>Confirm Password</label>
    <input
      type='password'
      name='confirmPassword'
      placeholder='confirmPassword'
      value={props.user.confirmPassword}
      onChange={props.onChange}
    />
    <br />
    <label htmlFor='name'>Name</label>
    <input
      type='text'
      name='name'
      placeholder='name'
      value={props.user.name}
      onChange={props.onChange}
    />
    <br />
    <input type='submit' onClick={props.onSave} />
  </form>
)

export default RegisterForm
