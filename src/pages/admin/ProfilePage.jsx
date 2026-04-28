import React, { useEffect, useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Form,
  Button,
  Alert
} from 'react-bootstrap'
import { FiMail, FiPhone, FiBriefcase } from 'react-icons/fi'
import axios from 'axios'

import { useUser } from '../../context/UserContext'
const ProfilePage = () => {
  const [user, setUser] = useState(null)
  const [form, setForm] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)
// const { fetchProfile } = useUser()

  //  GET TOKEN
  const token = localStorage.getItem('token')

  //  FETCH PROFILE DIRECTLY
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await axios.get('/api/users/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const profile = res.data?.data || res.data

        setUser(profile)
        setForm(profile)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  //  HANDLE INPUT
  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  //  UPDATE PROFILE
  const handleSave = async () => {
    setSaving(true)
    setMessage(null)

    try {
      await axios.put(`/api/users/${user._id}`, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setUser(form)
      setMessage('Profile updated successfully ')

    } catch (err) {
      console.error(err)
      setMessage('Update failed ❌')
    } finally {
      setSaving(false)
    }
  }

  //  LOADING
  if (loading) {
    return (
      <div className='text-center mt-5'>
        <Spinner />
      </div>
    )
  }

  //  SAFETY
  if (!user) {
    return <div className='text-center mt-5'>No Profile Found</div>
  }

  return (
    <Container fluid>

      <div className='mb-4'>
        <h4 className='main-head'>My Profile</h4>
        <small className='text-muted'>
          Manage your personal information and account details
        </small>
      </div>

      {message && <Alert variant='info'>{message}</Alert>}

      <Row className='g-4'>

        {/* LEFT */}
        <Col md={4}>
          <Card className='profile-card text-center p-4'>

            <div className='profile-avatar'>
              {user.name?.charAt(0)}
            </div>

            <h5 className='mt-3'>{user.name}</h5>
            <p className='text-muted'>{user.role}</p>

            <div className='profile-info'>
              <p><FiMail /> {user.email}</p>
              <p><FiPhone /> {user.phone || 'N/A'}</p>
              <p><FiBriefcase /> {user.department || 'N/A'}</p>
            </div>

          </Card>
        </Col>

        {/* RIGHT */}
        <Col md={8}>
          <Card className='p-4'>

            <h5 className='mb-3'>Edit Profile</h5>

            <Form>

              <Row>
                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      name='name'
                      value={form.name || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={form.email || ''}
                      disabled
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name='phone'
                      value={form.phone || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className='mb-3'>
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                      name='department'
                      value={form.department || ''}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>

            </Form>

          </Card>
        </Col>

      </Row>

    </Container>
  )
}

export default ProfilePage