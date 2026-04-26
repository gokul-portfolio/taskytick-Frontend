import React, { useEffect, useMemo } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import TaskCard from '../../components/user/TaskCard'
import { useUser } from '../../context/UserContext'
import { BsPersonFill } from 'react-icons/bs'
const ViewTaskPage = () => {
  const { tasks, users, loading, fetchTasks, deleteTask, updateTask } =
    useUser()

  // 🔥 FETCH TASKS
  useEffect(() => {
    fetchTasks()
  }, [])

  // 🔥 FORMAT TEXT
  const formatText = text =>
    text ? text.charAt(0).toUpperCase() + text.slice(1) : 'Others'

  // 🔥 GROUP: DEPARTMENT → USER → TASKS
  const groupedTasks = useMemo(() => {
    if (!tasks || tasks.length === 0) return {}

    return tasks.reduce((acc, task) => {
      // ✅ SAFE assignedTo handling
      if (!task.assignedTo) {
        if (!acc['others']) acc['others'] = {}
        if (!acc['others']['Unassigned']) acc['others']['Unassigned'] = []

        acc['others']['Unassigned'].push({
          ...task,
          assignedTo: 'Unassigned'
        })

        return acc
      }

      // 🔥 GET USER ID
      const assignedId =
        typeof task.assignedTo === 'object'
          ? task.assignedTo?._id
          : task.assignedTo

      // 🔥 FIND USER
      const user = users.find(u => u._id === assignedId)

      const dept = user?.department || 'others'
      const userName = user?.name || 'Unassigned'

      // 🔥 INIT STRUCTURE
      if (!acc[dept]) acc[dept] = {}
      if (!acc[dept][userName]) acc[dept][userName] = []

      // 🔥 PUSH TASK
      acc[dept][userName].push({
        id: task._id,
        title: task.title || 'No Title',
        description: task.description || 'No Description',
        priority: task.priority?.toLowerCase() || 'medium',
        status: task.status || 'not-started',
        dueDate: task.dueDate
          ? new Date(task.dueDate).toLocaleDateString()
          : null,
        assignedTo: userName,
        role: 'admin'
      })

      return acc
    }, {})
  }, [tasks, users])

  return (
    <section>
      <div className='inner-user'>
        <Container fluid>
          {/* 🔥 LOADING */}
          {loading ? (
            <div className='text-center mt-5'>
              <Spinner animation='border' />
            </div>
          ) : Object.keys(groupedTasks).length === 0 ? (
            <div className='text-center mt-5'>
              <h5>No Tasks Found</h5>
            </div>
          ) : (
            Object.entries(groupedTasks).map(([department, usersObj]) => (
              <div key={department} className='team-section'>
                {/* 🔥 DEPARTMENT */}
                <h3 className='main-head mt-5 mb-3'>
                  {formatText(department)} Team
                </h3>

                {/* 🔥 USERS */}
                {Object.entries(usersObj).map(([userName, tasks]) => (
                  <div key={userName} className='mb-4'>
                    <h5 className='mb-3 d-flex align-items-center gap-2'>
                      <BsPersonFill />
                      {userName}
                    </h5>

                    <Row className='g-4'>
                      {tasks.map(task => (
                        <Col key={task.id} xl={6} lg={6} md={6} sm={12}>
                          <TaskCard
                            {...task}
                            role='admin'
                            onDelete={id => deleteTask(id)}
                            onStatusChange={(id, status) =>
                              updateTask(id, { status })
                            }
                          />
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            ))
          )}
        </Container>
      </div>
    </section>
  )
}

export default ViewTaskPage
