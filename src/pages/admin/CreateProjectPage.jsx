import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form } from 'react-bootstrap'
import { useUser } from '../../context/UserContext'

import TextInput from '../../components/form/TextInput'
import TextArea from '../../components/form/TextArea'
import SelectInput from '../../components/form/SelectInput'
import CheckboxInput from '../../components/form/CheckboxInput'

import {
  FiFolder,
  FiFileText,
  FiUsers,
  FiCalendar,
  FiFlag,
  FiCheckCircle,
  FiRefreshCcw
} from 'react-icons/fi'

import Button from '../../components/common/Button'

const CreateProjectPage = () => {
  const { createProject, users, fetchUsers } = useUser()

  const [projectData, setProjectData] = useState({
    name: '',
    description: '',
    clientName: '',
    projectManager: '',
    priority: 'Medium',
    startDate: '',
    endDate: '',
    status: 'Active',
    billable: true
  })

  // 🔥 Fetch users on load
  useEffect(() => {
    fetchUsers()
  }, [])

  // 🔥 Dynamic managers from users
  const managers = users
    .filter(user => user.role === 'admin' || user.role === 'manager')
    .map(user => ({
      value: user._id,
      label: user.name
    }))

  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setProjectData(prev => ({
      ...prev,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'priority'
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : name === 'status'
          ? value === 'on-hold'
            ? 'Inactive'
            : value.charAt(0).toUpperCase() + value.slice(1)
          : value
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await createProject(projectData)

      alert('✅ Project Created Successfully 🚀')

      setProjectData({
        name: '',
        description: '',
        clientName: '',
        projectManager: '',
        priority: 'Medium',
        startDate: '',
        endDate: '',
        status: 'Active',
        billable: true
      })
    } catch (err) {
      console.error(err)
      alert('❌ Error creating project')
    }
  }

  return (
    <section>
      <Container fluid>
        <div className='mb-4 d-flex flex-column gap-1'>
          <h4 className='main-head'>Create New Project</h4>
          <small className='text-muted'>
            Admin can create and manage projects
          </small>
        </div>

        <Form onSubmit={handleSubmit} className='main-parent-form'>
          <Row>
            <Col lg={8}>
              <TextInput
                label='Project Name'
                name='name'
                value={projectData.name}
                onChange={handleChange}
                placeholder='Enter project name'
                required
                icon={<FiFolder />}
              />

              <TextArea
                label='Project Description'
                name='description'
                value={projectData.description}
                onChange={handleChange}
                rows={6}
                placeholder='Describe project scope'
                icon={<FiFileText />}
              />

              <TextInput
                label='Client Name'
                name='clientName'
                value={projectData.clientName}
                onChange={handleChange}
                placeholder='Enter client name'
                icon={<FiUsers />}
              />
            </Col>

            <Col lg={4}>
              <SelectInput
                label='Project Manager'
                name='projectManager'
                value={projectData.projectManager}
                onChange={handleChange}
                icon={<FiUsers />}
                options={managers} // ✅ dynamic users
              />

              <SelectInput
                label='Priority'
                name='priority'
                value={projectData.priority.toLowerCase()}
                onChange={handleChange}
                icon={<FiFlag />}
                options={[
                  { value: 'low', label: 'Low' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'high', label: 'High' }
                ]}
              />

              <TextInput
                label='Start Date'
                name='startDate'
                type='date'
                value={projectData.startDate}
                onChange={handleChange}
                icon={<FiCalendar />}
              />

              <TextInput
                label='End Date'
                name='endDate'
                type='date'
                value={projectData.endDate}
                onChange={handleChange}
                icon={<FiCalendar />}
              />

              <SelectInput
                label='Status'
                name='status'
                value={projectData.status.toLowerCase()}
                onChange={handleChange}
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'on-hold', label: 'On Hold' },
                  { value: 'completed', label: 'Completed' }
                ]}
              />

              <CheckboxInput
                label='Billable Project'
                name='billable'
                checked={projectData.billable}
                onChange={handleChange}
              />
            </Col>
          </Row>

          <div className='d-flex justify-content-center gap-2'>
            <Button
              type='submit'
              label='Create Project'
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
      </Container>
    </section>
  )
}

export default CreateProjectPage
