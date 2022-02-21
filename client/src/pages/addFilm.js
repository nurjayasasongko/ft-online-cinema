import { useEffect, useRef, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";

export default function AddFilm() {
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null,
    price: '',
    description: '',
    filmUrl: '',
    categoryId: null,
    // img: null
  })

  const [categories, setCategories] = useState([])

  const router = useHistory()

  const [status, setStatus] = useState({})

  const hiddenFileInput = useRef(null)

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
      // img: e.target.type === 'file' ? URL.createObjectURL(e.target.files[0]) : formData.img
    })
  }

  useEffect(() => {
    async function getCategories() {
      try {
        const resp = await API.get('/category')
        setCategories(resp.data.categories)
      } catch(err) {
        setStatus({
          message: 'Can\'t get categories field value',
          error: true
        })
      }
    }

    getCategories()
  }, [])

  const handleCreateFilm = async (e) => {
    try {
      e.preventDefault()

      const config = {
        headers: {
          "Content-type": "multipart/form-data"
        },
        raw: true
      }

      const form = new FormData()
      form.set('title', formData.title)
      form.append('thumbnail', formData.thumbnail[0], formData.thumbnail[0].name)
      form.set('price', formData.price)
      form.set('filmUrl', formData.filmUrl)
      form.set('categoryId', formData.categoryId)
      form.set('description', formData.description)

      const resp = await API.post('/film', form, config)

      setStatus({
        message: 'Your film is successfully added',
        error: false
      })

      setTimeout(() => {
        router.push(`/film/${resp.data.film.id}`)
      }, 1500)

    } catch (err) {
      console.log(err)
      setStatus({
        message: 'Something went wrong with the server, please try again later',
        error: true
      })
    }
    
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Add Film</h1>
      {
        status.message && <Alert variant={status.error ? 'danger' : 'primary'}>{status.message}</Alert>
      }
      <Form>
        <div className="d-flex align-items-center">
          <Form.Group className="flex-grow-1 mr-3">
            <Form.Control type="text" name="title" placeholder="Title" onChange={onChange} />
          </Form.Group>
          <Form.Group onClick={() => hiddenFileInput.current.click()}>
            <Form.Control type="text" placeholder="Attach Thumbnail" img src="/frame1.svg" disabled value={formData.thumbnail && formData.thumbnail[0] ? formData.thumbnail[0].name : ''} className="cursor-pointer" />
          </Form.Group>
          <Form.Group>
            <Form.File ref={hiddenFileInput} label="Thumbnail" name="thumbnail"  onChange={onChange} style={{ display: "none" }} />
          </Form.Group>
        </div>
        <Form.Group>
          <Form.Control as="select" custom name="categoryId" onChange={onChange}>
            {
              categories.map(category => (
                <option value={category.id} key={category.id}>{category.name}</option>
              ))
            }
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" name="price" placeholder="Price" onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" name="filmUrl" placeholder="Link Film" onChange={onChange} />
        </Form.Group>
        <Form.Group>
          <Form.Control as="textarea" rows={3} name="description" placeholder="Description" onChange={onChange} />
        </Form.Group>
        <div className="d-flex flex-row-reverse">
          <Button className="mt-4 btn-add-film" onClick={handleCreateFilm}>Add Film</Button>
        </div>
      </Form>
    </Container>
  )
}
