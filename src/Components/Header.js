import { signOut } from 'firebase/auth'
import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase-config'
import { setAdmin } from '../pages/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'




export const Header = () => {
  const {admin} = useSelector((state)=>state.adminInfo)
  const dispatch = useDispatch();
  const handleOnlogout =() =>{
    signOut(auth).then(()=>{
dispatch(setAdmin({}))
    })
  }
  return (
   

    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand href="#home">Learning management system</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link className="nav-link" to="/">Home</Link>
            {
              admin?.uid?(
                <>
                   <Link className="nav-link" to="/dashboard">Dashboard</Link>
              
                </>

              ) :
              (<>
              <Link className="nav-link" to="/signin">Sign in</Link>
              <Link className="nav-link" to="/signin"  onClick={handleOnlogout}>Sign Out</Link> </>)
            }
         
             
          
             
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
