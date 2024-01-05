import React, { Component } from 'react'
import Loading from './Loading.gif'

export class LoadingSpinner extends Component {

  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src={Loading} alt="Loading" />
      </div>
    )
  }
}

export default LoadingSpinner