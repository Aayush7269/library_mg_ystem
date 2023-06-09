import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = () => {
 
    const {admin} = useSelector((state)=> state.adminInfo)
    return (
    admin?.uid?children:<Navigate to="signin"/>

  )
}
