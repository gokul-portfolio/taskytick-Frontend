import React, { useMemo, useEffect } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import UserCard from '../../components/common/UserCard'
import { useUser } from '../../context/UserContext'

const ViewUserPage = () => {

  //  CORRECT DATA
  const { users, fetchUsers, dataLoading, deleteUser } = useUser()

  //  FETCH USERS ON LOAD
  useEffect(() => {
    fetchUsers()
  }, [])

  //  GROUP USERS
  const usersByDepartment = useMemo(() => {
    return (users || []).reduce((acc, user) => {

      const dept = user.department || 'Others'

      if (!acc[dept]) acc[dept] = []

      acc[dept].push({
        id: user._id,
        name: user.name || 'N/A',
        email: user.email || 'N/A',
        phone: user.phone || 'N/A',
        address: user.address || 'N/A',
        role: user.role || 'N/A',
        department: dept,
        team: dept,

        joinedDate: user.createdAt
          ? new Date(user.createdAt).toLocaleDateString()
          : 'N/A',

        updatedDate: user.updatedAt
          ? new Date(user.updatedAt).toLocaleDateString()
          : 'N/A',

        status: user.isActive ? 'Active' : 'Inactive',
        statusClass: user.isActive ? 'active' : 'inactive'
      })

      return acc

    }, {})
  }, [users])

  //  DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return

    try {
      await deleteUser(id)
      alert('User deleted')
    } catch (err) {
      alert('Delete failed')
    }
  }

  return (
    <section>
      <div className='inner-user'>
        <Container fluid>

          {/*  1. LOADING */}
          {dataLoading ? (
            <div className='text-center mt-5'>
              <Spinner animation='border' />
              <p>Loading users...</p>
            </div>

          /*  2. EMPTY */
          ) : Object.keys(usersByDepartment).length === 0 ? (
            <div className='text-center mt-5'>
              <h5>No Users Found</h5>
            </div>

          /*  3. DATA */
          ) : (
            Object.entries(usersByDepartment).map(([department, users]) => (
              <div key={department} className='team-section'>

                <h3 className='main-head mt-5 mb-3'>
                  {department} Team
                </h3>

                <Row className='g-4'>
                  {users.map(user => (
                    <Col key={user.id} xl={4} lg={4} md={6} sm={12}>
                      <UserCard
                        user={user}
                        onDelete={() => handleDelete(user.id)}
                      />
                    </Col>
                  ))}
                </Row>

              </div>
            ))
          )}

        </Container>
      </div>
    </section>
  )
}

export default ViewUserPage