import { useEffect, useState } from "react";
import { Table, Container, DropdownButton, Dropdown, Alert } from "react-bootstrap";
import { API } from "../config/api";
import NotFound from "./notFound";

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [isError, setIsError] = useState(false)
  const [msg, setMsg] = useState({ error: false, text: '' })

  useEffect(() => {
    async function getTransactions() {
      try {
        const resp = await API.get('/transactions')

        setTransactions(resp.data.transactions)
      } catch(err) {
        console.log(err)
        setIsError(true)
      }
    }

    getTransactions()
  }, [msg.text])

  if (isError) {
    return <NotFound />
  }

  async function updateStatus(id, status) {
    try {
      await API.patch(`/transaction/${id}`, { status })
      setMsg({ error: false, text: 'Transaction status update successfully' })
    } catch(err) {
      setMsg({ error: true, text: 'Something wrong with the server, please try again' })
    }

    setTimeout(() => {
      setMsg({ error: false, text: '' })
    }, 1500)
  }

  return (
    <Container className="mt-5">
      <h1 className="mb-4">Incoming Transaction</h1>
      {
        msg.text && <Alert variant={msg.error ? 'danger' : 'primary'}>{msg.text}</Alert>
      }
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>User</th>
            <th>Transfer Proof</th>
            <th>Film</th>
            <th>Number Account</th>
            <th>Status Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            transactions.map((tr, idx) => (
              <tr key={tr.id}>
                <td>{idx + 1}</td>
                <td>{tr.user.fullName}</td>
                <td><a href={`http://localhost:5000/uploads/${tr.transferProof}`}>{tr.transferProof}</a></td>
                <td>{tr.film.title}</td>
                <td>{tr.accountNumber}</td>
                <td>{tr.status}</td>
                <td>
                <DropdownButton title="Action">
                  <Dropdown.Item onClick={() => updateStatus(tr.id, 'approved')}>Approve</Dropdown.Item>
                  <Dropdown.Item onClick={() => updateStatus(tr.id, 'pending')}>Pending</Dropdown.Item>
                  <Dropdown.Item onClick={() => updateStatus(tr.id, 'canceled')}>Cancel</Dropdown.Item>
                </DropdownButton>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  )
}
