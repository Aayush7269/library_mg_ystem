import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export const UserLayout = ({children}) => {
  return (
    <div>
        <Header/>
        <div className='main'>{children}</div>
        <Footer/>
    </div>
  )
}
