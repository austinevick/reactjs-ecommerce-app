import { useContext, useEffect } from 'react'
import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import { ThemeContext } from './context/AppContext'

function App() {
  const { state: { mode, cart }, dispatch } = useContext(ThemeContext)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar expand='lg'>
          <Container>
            <Navbar.Brand>AMAZON CLONE</Navbar.Brand>
          </Container>
          <Nav>
            <Button onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'} />
            </Button>
            <Link to="/cart" className='nav-link'>
              {
                cart.cartItems.length > 0 && (<Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}</Badge>)
              }
            </Link>
            <Link to="/signin" className='nav-link'>Sign in</Link>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className='mt-3'>
          <Outlet></Outlet>
        </Container>
      </main>
      <footer>
        <div className='text-center'>
          All rights reserve
        </div>
      </footer>
    </div>
  )
}

export default App
