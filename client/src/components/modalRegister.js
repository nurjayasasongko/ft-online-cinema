import { useContext, useState } from "react"
import { Modal, Button, Form, Alert } from "react-bootstrap"
import { API, setAuthToken } from "../config/api";
import { ModalContext } from "../contexts/modalContext";
import { UserContext } from "../contexts/userContext";

const ModalRegister = ({ isVisible, onHide, showModalLogin }) => {
  const [status, setStatus] = useState({})
  const [, dispatch] = useContext(UserContext);
  const [{ isVisibleRegister }, dispatchModal] = useContext(ModalContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: ''
  })

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value  })
  }

  const onSubmit = async (e) => {
    try {
      e.preventDefault()

      const resp = await API.post('/register', formData)
  
      setStatus({
        message: 'Success',
        error: false
      })
  
      setAuthToken(resp.data.data.user.token)
  
      setTimeout(() => {
        dispatchModal({
          type: 'HIDE_REGISTER_MODAL'
        })
        dispatch({
          type: 'LOGIN',
          payload: resp.data.data.user
        })
        setStatus({})
      }, 1000)
    } catch(err) {
      if (err.response) {
        setStatus({
          message: err.response.data.message,
          error: true
        })
      }
    }
  }

  const onClickLogin = () => {
    dispatchModal({
      type: 'SHOW_LOGIN_MODAL'
    })
  }

  return (
    <Modal centered show={isVisibleRegister} onHide={() => dispatchModal({ type: 'HIDE_REGISTER_MODAL' })}>
      <Modal.Body className="container-modal">
        <div className="title-modal">
          Register
        </div>
        {
          status.message && <Alert variant={status.error ? 'danger' : 'primary'}>{status.message}</Alert>
        }
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Control className="form-input" name="email" onChange={e => onChange(e)} type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Control className="form-input" name="password" onChange={e => onChange(e)} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group controlId="formBasicFullname">
            <Form.Control className="form-input" name="fullName" onChange={e => onChange(e)} placeholder="Full Name" />
          </Form.Group>
          <Button onClick={e => onSubmit(e)} className="btn-modal" variant="primary" type="submit" block>
            Register
          </Button>
        </Form>
        <div className="footer-modal">
          Already have an account ? Click&nbsp;<u className="cursor-pointer" onClick={onClickLogin}>Here</u>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalRegister
