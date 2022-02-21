import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";
import { ModalContext } from "../contexts/modalContext";
import { UserContext } from "../contexts/userContext";
import { convertToRupiah } from "../utils/helper";

export default function Home() {
  const [films, setFilms] = useState([])

  const router = useHistory()

  const [{ isLogin }] = useContext(UserContext)
  const [, dispatchModal] = useContext(ModalContext)

  useEffect(() => {
    async function getFilms() {
      try {
        const resp = await API.get('/film')

        setFilms(resp.data.films)
      } catch(err) {
        console.log(err)
        // setIsError(true)
      }
    }

    getFilms()
  }, [])

  const goToDetailPage = (id) => {
    if (isLogin) {
      router.push(`/film/${id}`)
    } else {
      dispatchModal({
        type: 'SHOW_LOGIN_MODAL'
      })
    }
  }

  const randIndex = Math.floor(Math.random() * films.length);


  return (
    <>
      {
        films.length && (
          <Container>
            <div className="mt-5" className="highlight-film" style={{
              backgroundImage: `url(http://localhost:5000/uploads/${films[randIndex].thumbnail})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}>
              <h1 className="primary-color">{films[randIndex].title}</h1>
              <div className="mt-3">
                <b>{films[randIndex].category.name}</b>
              </div>
              <div className="primary-color mb-3">
                {convertToRupiah(films[randIndex].price)}
              </div>
              <p>
                {films[randIndex].description}
              </p>
              <p>
                <Button variant="primary" onClick={() => goToDetailPage(films[randIndex].id)}>Buy Now</Button>
              </p>
            </div>
          </Container>
        )
      }
      <div className="mt-5 container-list-film">
        <h1 className="mb-4">List Film</h1>
        <Row>
          {
            films.map(film => (
              <Col key={film.id} md={2} className="mb-5">
                <img className="cursor-pointer" onClick={() => goToDetailPage(film.id)} src={`http://localhost:5000/uploads/${film.thumbnail}`} alt={film.title} width="180px" height="250px" />
              </Col>
            ))
          }
        </Row>
      </div>
    </>
  )
}
