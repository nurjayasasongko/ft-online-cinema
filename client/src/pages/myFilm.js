import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { API } from "../config/api";
import NotFound from "./notFound";

export default function MyFilm() {
  const [myFilm, setMyFilm] = useState([])
  const [isError, setIsError] = useState(false)

  const router = useHistory()

  useEffect(() => {
    async function getMyFilm() {
      try {
        const resp = await API.get('/my-films')

        setMyFilm(resp.data.myFilms)
      } catch(err) {
        console.log(err)
        setIsError(true)
      }
    }

    getMyFilm()
  }, [])

  if (isError) {
    return <NotFound />
  }

  
  return (
    <Container className="mt-5">
      <h1 className="mb-4">My List Film</h1>
      <Row>
        {
          myFilm.map(film => (
            <>
              <Col md={2} className="mb-5">
                <img className="cursor-pointer" onClick={() => router.push(`/film/${film.id}`)} src={`http://localhost:5000/uploads/${film.thumbnail}`} alt={film.title} width="180px" height="250px" />
              </Col>
            </>
          ))
        }
      </Row>
    </Container>
  )
}
