import { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap"
import { useHistory } from "react-router-dom";
import { ModalContext } from "../contexts/modalContext";
import { UserContext } from "../contexts/userContext";

const NavbarComponent = () => {
  const [{ isLogin, userData }, dispatchUser] = useContext(UserContext);
  const [, dispatch] = useContext(ModalContext);
  const router = useHistory();

  const goTo = path => {
    router.push(path);
  }

  const logout = () => {
    dispatchUser({ type: 'LOGOUT' })
  }

  return (
    <Navbar variant="dark" className="navbar-container" expand="lg">
      <Navbar.Brand onClick={() => goTo('/')} className="cursor-pointer">
        <img src="/Icon.svg" alt="icon-holyways" className="icon" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
        {
          isLogin ? (
            <NavDropdown title={(<img src="/profile.svg" alt="profile" />)}>
              {
                userData && userData.role === 'admin'
                  ? (
                    <>
                      <NavDropdown.Item onClick={() => goTo('/add-film')}>
                          <div className="d-flex align-items-center">
                          <img src="/clapperboard.svg" alt="add-film" height="20px" className="mr-2" />
                          <b>Add Film</b>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => goTo('/transactions')}>
                        <div className="d-flex align-items-center">
                        <img src="/transaction.svg" alt="transactions" height="20px" className="mr-2 primary-color" />
                        <b>Transactions</b>
                      </div>
                    </NavDropdown.Item>
                  </>
                  )
                  : (
                    <>
                      <NavDropdown.Item onClick={() => goTo('/profile')}>
                        <div className="d-flex align-items-center">
                          <img src="/user.svg" alt="user" height="20px" className="mr-2" />
                          <b>Profile</b>
                        </div>
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={() => goTo('/my-film')}>
                        <div className="d-flex align-items-center">
                          <img src="/clapperboard.svg" alt="fund" height="20px" className="mr-2" />
                          <b>My List Film</b>
                        </div>
                      </NavDropdown.Item>
                    </>
                  )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>
                <div className="d-flex align-items-center">
                  <img src="/logout.svg" alt="logout" height="20px" className="mr-2" />
                  <b>Logout</b>
                </div>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
              <button className="btn btn-login" onClick={() => dispatch({ type: 'SHOW_LOGIN_MODAL' })}>Login</button>
              <button className="btn btn-register" onClick={() => dispatch({ type: 'SHOW_REGISTER_MODAL' })}>Register</button>
            </>
          )
        }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavbarComponent
