import { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { API } from "../config/api";
import { convertToRupiah } from "../utils/helper";
import NotFound from "./notFound";

export default function Profile() {
  const [profile, setProfile] = useState({})
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    async function getProfile() {
      try {
        const resp = await API.get('/profile')

        setProfile(resp.data.profile)
      } catch(err) {
        console.log(err)
        setIsError(true)
      }
    }

    getProfile()
  }, [])

  if (isError) {
    return <NotFound />
  }

  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-item-center">
        <div>
          <h1 className="mb-4">My Profile</h1>
          <div className="d-flex justify-content-between align-item-center">
            <img src="/profile-pic.jpg" alt="profile-pic" width="180px" height="221.79px" />
            <div className="d-flex flex-column ml-4 justify-content-between">
              <div>
                <h5>Fullname</h5>
                <p>{profile.fullName}</p>
              </div>
              <div>
                <h5>Email</h5>
                <p>{profile.email}</p>
              </div>
              <div>
                <h5>Phone</h5>
                <p>{profile.phone || '-'}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="mb-4">History Transaction</h1>
          {
            profile.films && profile.films.map(film => (
              <Card key={film.id} style={{ width: '419px', height: 'auto', marginBottom: '1rem', borderColor: '#5a1432' }}>
                <Card.Body className="card-profile">
                  <div className="d-flex flex-column justify-content-between">
                    <b>{film.title}</b>
                    <i>{film.userFilm.orderDate}</i>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="primary-color">Price: {convertToRupiah(film.price)}</div>
                      <div className="alert-container">
                        <div className="alert-text">{film.userFilm.status === 'approved' ? 'Finished' : 'Pending'}</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            ))
          }
        </div>
      </div>
    </Container>
  )
}
