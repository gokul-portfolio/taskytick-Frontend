import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'

import TextInput from '../../components/form/TextInput'
import TextArea from '../../components/form/TextArea'
import SelectInput from '../../components/form/SelectInput'
import CheckboxInput from '../../components/form/CheckboxInput'
import Button from '../../components/common/Button'

import {
  FiCheckCircle,
  FiRefreshCcw,
  FiEdit,
  FiFileText,
  FiUsers,
  FiBriefcase,
  FiFlag,
  FiCalendar,
  FiShield
} from 'react-icons/fi'

import { createTask } from '../../api/task.api'

// 🔥 USE CONTEXT
import { useUser } from '../../context/UserContext'

const CreateTaskPage = () => {
  const {  users, projects, fetchProjects  } = useUser() // 🔥 real users

  const [filteredUsers, setFilteredUsers] = useState([])

  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    role: '',
    assignedTo: '',
    project: '',
    priority: 'medium',
    dueDate: '',
    requiresApproval: true
  })

  const [loading, setLoading] = useState(false)

  // 🔥 FILTER USERS BASED ON ROLE
  useEffect(() => {
    fetchProjects() 
    if (!taskData.role) {
      setFilteredUsers([])
      return
    }

    const filtered = users.filter(
      u => u.department?.toLowerCase() === taskData.role
    )

    setFilteredUsers(filtered)
  }, [taskData.role, users])

  // 🔄 handle input
  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setTaskData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // 🔥 SUBMIT
  const handleSubmit = async e => {
    e.preventDefault()

    try {
      setLoading(true)

      const payload = {
        title: taskData.title,
        description: taskData.description,
        designation: taskData.role,
        assignedTo: taskData.assignedTo || null,
        project: taskData.project,
        priority:
          taskData.priority.charAt(0).toUpperCase() +
          taskData.priority.slice(1),
        dueDate: taskData.dueDate || null,
        requiresApproval: taskData.requiresApproval
      }

      await createTask(payload)

      alert('Task created successfully 🔥')

      // reset
      setTaskData({
        title: '',
        description: '',
        role: '',
        assignedTo: '',
        project: '',
        priority: 'medium',
        dueDate: '',
        requiresApproval: true
      })
    } catch (err) {
      console.error(err)
      alert('Error ❌')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <Container fluid>
        <div className='mb-4 d-flex flex-column gap-1'>
          <h4 className='main-head'>Create Task</h4>
          <small className='text-muted'>Admin creates and assigns tasks</small>
        </div>

        <Form onSubmit={handleSubmit} className='main-parent-form'>
          <Row>
            {/* LEFT */}
            <Col lg={8}>
              <TextInput
                label='Task Title'
                name='title'
                value={taskData.title}
                onChange={handleChange}
                required
                icon={<FiEdit />}
              />

              <TextArea
                label='Description'
                name='description'
                value={taskData.description}
                onChange={handleChange}
                rows={6}
                required
                icon={<FiFileText />}
              />
            </Col>

            {/* RIGHT */}
            <Col lg={4}>
              {/* ROLE */}
              <SelectInput
                label='Designation / Role'
                name='role'
                value={taskData.role}
                onChange={e =>
                  setTaskData({
                    ...taskData,
                    role: e.target.value,
                    assignedTo: ''
                  })
                }
                required
                icon={<FiUsers />}
                options={[
                  { value: 'developer', label: 'Developer' },
                  { value: 'design', label: 'Designer' },
                  { value: 'management', label: 'Manager' },
                  { value: 'sales', label: 'Sales' }
                ]}
              />

              {/* ASSIGN USER */}
              <SelectInput
                label='Assign To'
                name='assignedTo'
                value={taskData.assignedTo}
                onChange={handleChange}
                disabled={!taskData.role}
                icon={<FiUsers />}
                options={
                  filteredUsers.length > 0
                    ? filteredUsers.map(u => ({
                        value: u._id,
                        label: u.name
                      }))
                    : [
                        {
                          value: '',
                          label: 'No users available'
                        }
                      ]
                }
              />

              {/* PROJECT (ONLY ACTIVE) */}
            <SelectInput
  label='Project'
  name='project'
  value={taskData.project}
  onChange={handleChange}
  icon={<FiBriefcase />}
  options={
    (projects || []).length > 0
      ? projects.map(p => ({
          value: p._id,     // 🔥 IMPORTANT (id save pannum)
          label: p.name     // 🔥 UI la name show
        }))
      : [
          {
            value: '',
            label: 'No projects available'
          }
        ]
  }
/>

              {/* PRIORITY */}
              <SelectInput
                label='Priority'
                name='priority'
                value={taskData.priority}
                onChange={handleChange}
                icon={<FiFlag />}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' }
                ]}
              />

              <TextInput
                label='Due Date'
                name='dueDate'
                type='date'
                value={taskData.dueDate}
                onChange={handleChange}
                icon={<FiCalendar />}
              />

              <CheckboxInput
                label='Requires Admin Approval'
                name='requiresApproval'
                checked={taskData.requiresApproval}
                onChange={handleChange}
                icon={<FiShield />}
              />
            </Col>
          </Row>

          <div className='d-flex justify-content-center gap-2'>
            <Button
              type='submit'
              label={loading ? 'Creating...' : 'Create Task'}
              icon={<FiCheckCircle />}
              disabled={loading}
            />

            <Button
              type='button'
              label='Reset Form'
              variant='secondary'
              icon={<FiRefreshCcw />}
              onClick={() =>
                setTaskData({
                  title: '',
                  description: '',
                  role: '',
                  assignedTo: '',
                  project: '',
                  priority: 'medium',
                  dueDate: '',
                  requiresApproval: true
                })
              }
            />
          </div>
        </Form>
      </Container>
    </section>
  )
}

export default CreateTaskPage
