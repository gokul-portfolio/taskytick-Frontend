import React, { useEffect, useState, useMemo } from 'react'
import {
  Container,
  Table,
  Badge,
  ProgressBar,
  Pagination,
  Spinner
} from 'react-bootstrap'
import { useUser } from '../../context/UserContext'

const UserProjectPage = () => {
  const { projects, fetchProjects, currentUser } = useUser()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchProjects()
  }, [])

  //  SAFE ARRAY
  const safeProjects = Array.isArray(projects) ? projects : []

  //  FILTER USER PROJECTS
  const myProjects = useMemo(() => {
    return safeProjects.filter(p => {
      const assigned =
        typeof p.assignedTo === 'object'
          ? p.assignedTo?._id
          : p.assignedTo

      return assigned === currentUser?._id
    })
  }, [safeProjects, currentUser])

  //  PAGINATION
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentProjects = myProjects.slice(indexOfFirst, indexOfLast)
  const totalPages = Math.ceil(myProjects.length / itemsPerPage)

  //  BADGES
  const getStatusBadge = status => {
    switch (status?.toLowerCase()) {
      case 'active':
        return <Badge bg='success'>Active</Badge>
      case 'inactive':
        return <Badge bg='warning'>On Hold</Badge>
      case 'completed':
        return <Badge bg='secondary'>Completed</Badge>
      default:
        return <Badge bg='dark'>Unknown</Badge>
    }
  }

  const getPriorityBadge = priority => {
    switch (priority?.toLowerCase()) {
      case 'high':
        return <Badge bg='danger'>High</Badge>
      case 'medium':
        return <Badge bg='warning'>Medium</Badge>
      case 'low':
        return <Badge bg='success'>Low</Badge>
      default:
        return <Badge bg='secondary'>Normal</Badge>
    }
  }

  //  LOADING
  if (!projects) {
    return <div className='text-center mt-5'><Spinner /></div>
  }

  return (
    <section>
      <Container fluid>

        <div className='mb-4'>
          <h1 className='main-head'>My Projects</h1>
          <small className='text-muted'>
            Projects assigned to you
          </small>
        </div>

        <Table className='align-middle'>
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Client</th>
              <th>Manager</th>
              <th>Progress</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {currentProjects.length > 0 ? (
              currentProjects.map((project, index) => (
                <tr key={project._id}>

                  <td>{indexOfFirst + index + 1}</td>

                  <td><strong>{project.name}</strong></td>

                  <td>{project.clientName || 'N/A'}</td>

                  <td>{project.projectManager?.name || 'N/A'}</td>

                  <td style={{ minWidth: '200px' }}>
                    <ProgressBar
                      now={project.progress || 0}
                      label={`${project.progress || 0}%`}
                    />
                  </td>

                  <td>{getPriorityBadge(project.priority)}</td>

                  <td>{getStatusBadge(project.status)}</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='7' className='text-center'>
                  No Assigned Projects
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="d-flex justify-content-center mt-4">
            <Pagination>

              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
              />

              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
              />

            </Pagination>
          </div>
        )}

      </Container>
    </section>
  )
}

export default UserProjectPage