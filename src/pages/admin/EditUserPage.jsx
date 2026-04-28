import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Spinner } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

/* Inputs */
import TextInput from '../../components/form/TextInput'
import SelectInput from '../../components/form/SelectInput'

/* Icons */
import {
  FiUser,
  FiMail,
  FiUsers,
  FiCheckCircle,
  FiRefreshCcw
} from 'react-icons/fi'

/* Button */
import Button from '../../components/common/Button'

/* Context */
import { useUser } from '../../context/UserContext'

const EditUserPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { getUserById, updateUser } = useUser()

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    role: '',
    status: 'active'
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // ================= LOAD USER =================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserById(id)

        console.log('API RESPONSE:', res)

        // Flexible handling (important)
        const user = res.user || res.data || res

        setUserData({
          name: user?.name || '',
          email: user?.email || '',
          phone: user?.phone || '',
          address: user?.address || '',
          role: user?.role || '',
          status: user?.status || 'active'
        })
      } catch (err) {
        console.error('Fetch Error:', err)
        alert('Failed to load user ❌')
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  // ================= HANDLE CHANGE =================
  const handleChange = e => {
    const { name, value } = e.target

    setUserData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // ================= SUBMIT =================
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setSaving(true)

      await updateUser(id, userData)

      alert('User updated successfully ')
      navigate('/admin/users')
    } catch (err) {
      console.error('Update Error:', err)
      alert('Update failed ❌')
    } finally {
      setSaving(false)
    }
  }

  // ================= RESET =================
  const handleReset = () => {
    window.location.reload() // reload original data
  }

  // ================= LOADING =================
  if (loading) {
    return (
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <Spinner animation='border' />
      </div>
    )
  }

  return (
    <section>
      <Container fluid>
        {/* HEADER */}
        <div className='mb-4 d-flex flex-column'>
          <h4 className='main-head'>Edit User</h4>
          <small className='text-muted'>Update user details</small>
        </div>

        <Form onSubmit={handleSubmit} className='main-parent-form'>
          <Row>
            {/* LEFT */}
            <Col lg={6}>
              <TextInput
                label='Full Name'
                name='name'
                value={userData.name}
                onChange={handleChange}
                placeholder='Enter name'
                icon={<FiUser />}
                required
              />

              <TextInput
                label='Email'
                name='email'
                value={userData.email}
                onChange={handleChange}
                placeholder='Enter email'
                icon={<FiMail />}
                required
              />
            </Col>
            {/* RIGHT */}
            <Col lg={6}>
              <SelectInput
                label='Role'
                name='role'
                value={userData.role}
                onChange={handleChange}
                icon={<FiUsers />}
                options={[
                  { value: 'admin', label: 'Admin' },
                  { value: 'user', label: 'User' }
                ]}
              />

              <SelectInput
                label='Status'
                name='status'
                value={userData.status}
                onChange={handleChange}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' }
                ]}
              />
            </Col>
            <Col lg={6}>
              <TextInput
                label='Phone Number'
                name='phone'
                value={userData.phone}
                onChange={handleChange}
                placeholder='Enter phone number'
              />
            </Col>
            <Col lg={6}>
              <TextInput
                label='Address'
                name='address'
                value={userData.address}
                onChange={handleChange}
                placeholder='Enter address'
              />
            </Col>
          </Row>

          {/* ACTION BUTTONS */}
          <div className='d-flex justify-content-center gap-2 mt-4'>
            <Button
              type='submit'
              label={saving ? 'Updating...' : 'Update User'}
              icon={<FiCheckCircle />}
              disabled={saving}
            />

            <Button
              type='button'
              label='Reset'
              variant='secondary'
              icon={<FiRefreshCcw />}
              onClick={handleReset}
            />
          </div>
        </Form>
      </Container>
    </section>
  )
}

export default EditUserPage
