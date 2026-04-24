import React, { useState } from 'react'
import { Container, Table, Badge, ProgressBar } from 'react-bootstrap'
import { FiEdit, FiEye } from 'react-icons/fi'
import SelectInput from '../../components/form/SelectInput'
import Button from '../../components/common/Button'

const ProjectPage = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Website Revamp',
      client: 'ABC Pvt Ltd',
      manager: 'Ravi Kumar',
      status: 'active',
      priority: 'high',

      // 🔥 NEW PROJECT DETAILS
      startDate: '2026-04-01',
      deadline: '2026-04-30',
      progress: 65,
      taskCount: 24
    },
    {
      id: 1,
      name: 'Website Revamp',
      client: 'ABC Pvt Ltd',
      manager: 'Ravi Kumar',
      status: 'active',
      priority: 'high',

      // 🔥 NEW PROJECT DETAILS
      startDate: '2026-04-01',
      deadline: '2026-04-30',
      progress: 65,
      taskCount: 24
    }
  ])

  const handleStatusChange = (id, newStatus) => {
    setProjects(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus } : p))
    )
  }

  const getStatusBadge = status => {
    switch (status) {
      case 'active':
        return <Badge bg='success'>Active</Badge>
      case 'on-hold':
        return <Badge bg='warning'>On Hold</Badge>
      case 'completed':
        return <Badge bg='secondary'>Completed</Badge>
      default:
        return <Badge bg='dark'>Unknown</Badge>
    }
  }

  const getPriorityBadge = priority => {
    switch (priority) {
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
          {/* HEADER */}
          <div className='mb-4 d-flex flex-column '>
            <h1 className='main-head'>Projects</h1>
            <small className='text-muted'>
              View projects, track progress & manage timelines
            </small>
          </div>

          {/* TABLE */}
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
                {projects.map((project, index) => (
                  <tr key={project.id}>
                    <td>{index + 1}</td>

                    <td>
                      <strong>{project.name}</strong>
                    </td>

                    <td>{project.client}</td>

                    <td>{project.manager}</td>

                    <td style={{ minWidth: '260px' }}>
                      <div className='project-details'>
                        <div className='detail-row'>
                          <span>
                            <i className='bi bi-calendar-event me-1'></i>
                            Start:
                          </span>
                          <strong>{project.startDate}</strong>
                        </div>

                        <div className='detail-row'>
                          <span>
                            <i className='bi bi-hourglass-split me-1'></i>
                            Deadline:
                          </span>
                          <strong>{project.deadline}</strong>
                        </div>

                        <div className='detail-row'>
                          <span>
                            <i className='bi bi-graph-up me-1'></i>
                            Progress:
                          </span>
                          <ProgressBar
                            now={project.progress}
                            label={`${project.progress}%`}
                            variant='success'
                            className='mt-1'
                          />
                        </div>

                        <div className='detail-row'>
                          <span>
                            <i className='bi bi-list-check me-1'></i>
                            Tasks:
                          </span>
                          <strong>{project.taskCount}</strong>
                        </div>
                      </div>
                    </td>

                    <td>{getPriorityBadge(project.priority)}</td>

                    <td>{getStatusBadge(project.status)}</td>

                    {/* STATUS UPDATE */}
                    <td style={{ minWidth: '150px' }}>
                      <SelectInput
                        value={project.status}
                        onChange={e =>
                          handleStatusChange(project.id, e.target.value)
                        }
                        options={[
                          { value: 'active', label: 'Active' },
                          { value: 'on-hold', label: 'On Hold' },
                          { value: 'completed', label: 'Completed' }
                        ]}
                      />
                    </td>

                    {/* ACTIONS */}
                    <td>
                      <div className='d-flex gap-2'>
                        <Button
                          size='sm'
                          
                          variant='outline-primary'
                          icon={<FiEye />}
                          title='View'
                        />
                        <Button
                          size='sm'
                          variant='outline-secondary'
                          icon={<FiEdit />}
                          title='Edit'
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </section>
  )
}

export default ProjectPage
