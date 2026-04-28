import React, { useState } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useUser } from '../../context/UserContext' //  use context

/* Reusable Inputs */
import TextInput from '../../components/form/TextInput'
import TextArea from '../../components/form/TextArea'
import SelectInput from '../../components/form/SelectInput'
import CheckboxInput from '../../components/form/CheckboxInput'

/* Icons */
import {
  FiUser,
  FiMail,
  FiPhone,
  FiBriefcase,
  FiShield,
  FiLock,
  FiCheckCircle,
  FiRefreshCcw,
  FiInfo
} from 'react-icons/fi'

/* Button */
import Button from '../../components/common/Button'

const CreateUserPage = () => {
  const { createUser } = useUser() //  API from context

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    password: '',
    address: '',
    isActive: true,
    isAdmin: false
  })

  /* HANDLE INPUT CHANGE */
  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setUserData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
      isAdmin: name === 'role' && value === 'admin' ? true : prev.isAdmin
    }))
  }

  /*  SUBMIT (CONTEXT VERSION) */
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const payload = {
        name: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        department: userData.department,
        address: userData.address,
        password: userData.password,
        isActive: userData.isActive,
        grantAdminAccess: userData.isAdmin
      }

      await createUser(payload)

      alert('User Created Successfully ')

      // reset form
      setUserData({
        fullName: '',
        email: '',
        phone: '',
        role: '',
        department: '',
        password: '',
        address: '',
        isActive: true,
        isAdmin: false
      })
    } catch (err) {
      console.error(err)
      alert('Error creating user')
    }
  }

  return (
    <section>
      <div className='inner-create-user'>
        <Container fluid>
          {/* HEADER */}
          <div className='mb-4'>
            <h4 className='main-head'>Create New User</h4>
            <br />
            <small className='text-muted'>
              Admin can create and manage team members
            </small>
          </div>

          <Form onSubmit={handleSubmit} className='main-parent-form'>
            <Row>
              {/* LEFT */}
              <Col lg={8}>
                <TextInput
                  label='Full Name'
                  name='fullName'
                  value={userData.fullName}
                  onChange={handleChange}
                  placeholder='Enter full name'
                  required
                  icon={<FiUser />}
                />

                <TextInput
                  label='Email Address'
                  name='email'
                  type='email'
                  value={userData.email}
                  onChange={handleChange}
                  placeholder='Enter email'
                  required
                  icon={<FiMail />}
                />

                <TextInput
                  label='Phone Number'
                  name='phone'
                  value={userData.phone}
                  onChange={handleChange}
                  placeholder='Enter phone number'
                  icon={<FiPhone />}
                />

                <TextArea
                  label='Address'
                  name='address'
                  value={userData.address}
                  onChange={handleChange}
                  rows={4}
                  placeholder='User address'
                  icon={<FiBriefcase />}
                />
              </Col>

              {/* RIGHT */}
              <Col lg={4}>
                <SelectInput
                  label='Role'
                  name='role'
                  value={userData.role}
                  onChange={handleChange}
                  required
                  icon={<FiShield />}
                  options={[
                    { value: 'admin', label: 'Admin' },
                    { value: 'user', label: 'User' }
                  ]}
                />

                <SelectInput
                  label='Department'
                  name='department'
                  value={userData.department}
                  onChange={handleChange}
                  icon={<FiBriefcase />}
                  options={[
                    { value: 'developer', label: 'Developer' },
                    { value: 'design', label: 'Designer' },
                    { value: 'sales', label: 'Sales' },
                    { value: 'management', label: 'Management' }
                  ]}
                />

                <TextInput
                  label='Temporary Password'
                  name='password'
                  type='password'
                  value={userData.password}
                  onChange={handleChange}
                  placeholder='Auto or manual password'
                  icon={<FiLock />}
                />

                <CheckboxInput
                  label='Active User'
                  name='isActive'
                  checked={userData.isActive}
                  onChange={handleChange}
                />

                {userData.role !== 'admin' && (
                  <CheckboxInput
                    label='Grant Admin Access'
                    name='isAdmin'
                    checked={userData.isAdmin}
                    onChange={handleChange}
                  />
                )}
              </Col>
            </Row>

            {/* BUTTONS */}
            <div className='d-flex justify-content-center gap-2'>
              <Button
                type='submit'
                label='Create User'
                icon={<FiCheckCircle />}
              />
              <Button
                type='reset'
                label='Reset Form'
                variant='secondary'
                icon={<FiRefreshCcw />}
              />
            </div>
          </Form>

          {/* NOTES */}
          <div className='highlight-notes mt-3'>
            <div className='highlight-notes-box'>
              <span className='highlight-icon'>
                <FiInfo />
              </span>
              <h6>Important Notes</h6>
              <p>
                Assign correct role and department. Admin & Team Lead roles have
                higher permissions.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default CreateUserPage
