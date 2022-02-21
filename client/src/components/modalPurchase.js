import { useState, useRef } from "react"
import { Form, Modal, Alert, Button } from "react-bootstrap"
import { API } from "../config/api"

const ModalPurchase = ({ isVisible, onHide, filmId, title }) => {
  const [formData, setFormData] = useState({
    accountNumber: '',
    transferProof: null,
    img: null
  })

  const [status, setStatus] = useState({})

  const hiddenFileInput = useRef(null)

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
      img: e.target.type === 'file' ? URL.createObjectURL(e.target.files[0]) : formData.img
    })
  }

  const handlePurchase = async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        }
      }

      const form = new FormData()
      form.set('accountNumber', formData.accountNumber)
      form.append('transferProof', formData.transferProof[0], formData.transferProof[0].name)

      await API.post(`/film/${filmId}`, form, config)

      setStatus({
        message: 'Thank you for buying this film, please wait 1x24 hours because your transaction is in process',
        error: false
      })

      setTimeout(() => {
        onHide()
        setStatus({})
      }, 1500)
    } catch(err) {
      console.log(err)
      setStatus({
        message: err.response && (err.response.data.message || 'Something went wrong with the server, please try again later'),
        error: true
      })
    }
  }

  return (
    <Modal centered show={isVisible} onHide={onHide}>
      <Modal.Body className="container-modal">
        {
          status.message && <Alert variant={status.error ? 'danger' : 'primary'}>{status.message}</Alert>
        }
        {
          <h1 className="mb-3">{title}</h1>
        }
        <Form>
          <Form.Group controlId="formBasicaccountNumber">
            <Form.Control name="accountNumber" onChange={onChange} type="number" placeholder="Input your account number" />
          </Form.Group>
            <div className="btn btn-attachment cursor-pointer mb-3" onClick={() => hiddenFileInput.current.click()}>
              Attach payment
              <img src="/attachment.svg" alt="attachment" />
            </div>
            {
              formData.img && (
                <Form.Group>
                  <img src={formData.img} alt="attachment img" style={{ maxWidth: '100%' }} />
                </Form.Group>
              )
            }
          <Form.File>
            <Form.File.Input ref={hiddenFileInput} name="transferProof" onChange={onChange} style={{ display: "none" }} />
          </Form.File>
          <Button block onClick={handlePurchase}>Pay</Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default ModalPurchase
