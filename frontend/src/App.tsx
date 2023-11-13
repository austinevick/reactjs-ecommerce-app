import { useContext, useEffect } from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ThemeContext } from './context/ThemeContext'

function App() {
  const { state: { mode }, dispatch } = useContext(ThemeContext)

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
            <a href="/cart" className='nav-link'>Cart</a>
            <a href="/signin" className='nav-link'>Sign in</a>
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
