import React, { useEffect, useState } from 'react'
import { Container, Table, Badge, ProgressBar, Pagination } from 'react-bootstrap'
import { FiEdit, FiTrash } from 'react-icons/fi'

import SelectInput from '../../components/form/SelectInput'
import Button from '../../components/common/Button'
import { useUser } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'

const ProjectPage = () => {
  const {
    projects,
    fetchProjects,
    updateProject,
    deleteProject
  } = useUser()

  const navigate = useNavigate()

  //  PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    fetchProjects()
  }, [])

  //  PAGINATION LOGIC
  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentProjects = projects.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(projects.length / itemsPerPage)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  //  STATUS UPDATE
  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateProject(id, {
        status:
          newStatus === 'on-hold'
            ? 'Inactive'
            : newStatus.charAt(0).toUpperCase() + newStatus.slice(1)
      })
    } catch (err) {
      console.error(err)
    }
  }

  //  DELETE FUNCTION
  const handleDelete = async id => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this project?'
    )

    if (!confirmDelete) return

    try {
      await deleteProject(id)
      alert(' Project deleted successfully')
    } catch (err) {
      console.error(err)
      alert('❌ Error deleting project')
    }
  }

  //  STATUS BADGE
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

  //  PRIORITY BADGE
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

  return (
    <section>
      <div className='inner-project'>
        <Container fluid>

          <div className='mb-4 d-flex flex-column gap-1'>
            <h1 className='main-head'>Projects</h1>
            <small className='text-muted'>
              View projects, track progress & manage timelines
            </small>
          </div>

          <div className='project-table-wrapper'>
            <Table className='project-table align-middle'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Manager</th>
                  <th>Project Details</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentProjects?.length > 0 ? (
                  currentProjects.map((project, index) => (
                    <tr key={project._id}>
                      <td>{indexOfFirst + index + 1}</td>

                      <td><strong>{project.name}</strong></td>

                      <td>{project.clientName || 'N/A'}</td>

                      <td>{project.projectManager?.name || 'N/A'}</td>

                      <td style={{ minWidth: '260px' }}>
                        <div className='project-details'>

                          <div className='detail-row'>
                            <span>Start:</span>
                            <strong>
                              {project.startDate
                                ? project.startDate.slice(0, 10)
                                : 'N/A'}
                            </strong>
                          </div>

                          <div className='detail-row'>
                            <span>End:</span>
                            <strong>
                              {project.endDate
                                ? project.endDate.slice(0, 10)
                                : 'N/A'}
                            </strong>
                          </div>

                          <div className='detail-row'>
                            <span>Progress:</span>
                            <ProgressBar
                              now={project.progress || 0}
                              label={`${project.progress || 0}%`}
                            />
                          </div>

                          <div className='detail-row'>
                            <span>Tasks:</span>
                            <strong>{project.taskCount || 0}</strong>
                          </div>

                        </div>
                      </td>

                      <td>{getPriorityBadge(project.priority)}</td>

                      <td>{getStatusBadge(project.status)}</td>

                      <td>
                        <SelectInput
                          value={project.status?.toLowerCase()}
                          onChange={e =>
                            handleStatusChange(project._id, e.target.value)
                          }
                          options={[
                            { value: 'active', label: 'Active' },
                            { value: 'on-hold', label: 'On Hold' },
                            { value: 'completed', label: 'Completed' }
                          ]}
                        />
                      </td>

                      <td>
                        <div className='d-flex gap-2'>

                          <Button
                            size='sm'
                            variant='outline-secondary'
                            icon={<FiEdit />}
                            title='Edit'
                            onClick={() =>
                              navigate(`/admin/projects/edit/${project._id}`)
                            }
                          />

                          <Button
                            size='sm'
                            variant='outline-danger'
                            icon={<FiTrash />}
                            title='Delete'
                            onClick={() => handleDelete(project._id)}
                          />

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='9' className='text-center'>
                      No Projects Found
                    </td>
                  </tr>
                )}
              </tbody>

            </Table>
          </div>

          {/*  PAGINATION */}
          <div className="d-flex justify-content-center mt-4 custum-pagenation" >
            <Pagination>

              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
              />

              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={i + 1 === currentPage}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
              />

            </Pagination>
          </div>

        </Container>
      </div>
    </section>
  )
}

export default ProjectPage