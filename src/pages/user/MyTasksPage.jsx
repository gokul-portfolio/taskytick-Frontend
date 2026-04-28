import React, { useEffect, useMemo } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import { FaEllipsisV, FaTools } from 'react-icons/fa'
import CustomDropdownButton from '../../components/common/CustomDropdownButton'
import TaskCard from '../../components/user/TaskCard'
import { useUser } from '../../context/UserContext'

const MyTasksPage = () => {
  const {
    tasks,
    fetchTasks,
    updateTask,
    deleteTask,
    dataLoading,
    currentUser
  } = useUser()

  // ================= INIT =================
  useEffect(() => {
    fetchTasks()
  }, [])

  // ================= FILTER =================
  const myTasks = useMemo(() => {
    return tasks?.filter((t) => {
      const assignedId =
        typeof t.assignedTo === 'object'
          ? t.assignedTo?._id
          : t.assignedTo

      return (
        assignedId === currentUser?._id ||
        t.userId === currentUser?._id
      )
    })
  }, [tasks, currentUser])

  // ================= STATUS =================
  const handleStatusChange = async (id, status) => {
    try {
      await updateTask(id, { status })
    } catch (err) {
      console.error('Update failed:', err)
    }
  }

  // ================= DELETE =================
  const handleDelete = async (id) => {
    try {
      await deleteTask(id)
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  // ================= ACTIONS =================
  const handleAction = (label) => {
    switch (label) {
      case 'Clear Filters':
        fetchTasks()
        break

      case 'Add Task':
        alert('Open Add Task Modal (implement next)')
        break

      case 'Export Tasks':
        exportTasks()
        break

      default:
        break
    }
  }

  const handleTools = (label) => {
    switch (label) {
      case 'Bulk Update':
        alert('Bulk update feature coming soon')
        break

      case 'Archive Tasks':
        alert('Archive feature coming soon')
        break

      case 'Download Report':
        exportTasks()
        break

      default:
        break
    }
  }

  // ================= EXPORT =================
  const exportTasks = () => {
    const data = myTasks.map((t) => ({
      title: t.title,
      status: t.status,
      priority: t.priority,
      dueDate: t.dueDate
    }))

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'tasks.json'
    a.click()
  }

  return (
    <section>
      <Container fluid>

        {/* ================= TOP BAR ================= */}
        <div className='top-bar d-flex justify-content-between align-items-center flex-wrap gap-3'>

          <div className='top-bar-left'>
            <h1>My Tasks</h1>
            <span>Manage and track your tasks</span>
          </div>

          <div className='top-bar-right d-flex gap-2 flex-wrap'>

            <div className='filter-wrapper'>
              <CustomDropdownButton
                label='Actions'
                icon={FaEllipsisV}
                options={[
                  { label: 'Clear Filters' },
                  { label: 'Add Task' },
                  { label: 'Export Tasks' }
                ]}
                onSelect={(item) => handleAction(item.label)}
              />
            </div>

            <div className='filter-wrapper'>
              <CustomDropdownButton
                label='Tools'
                icon={FaTools}
                options={[
                  { label: 'Bulk Update' },
                  { label: 'Archive Tasks' },
                  { label: 'Download Report' }
                ]}
                onSelect={(item) => handleTools(item.label)}
              />
            </div>

          </div>
        </div>

        {/* ================= TASK LIST ================= */}
        <div className='task-wrap mt-3'>

          {dataLoading ? (
            <div className='text-center mt-5'>
              <Spinner animation='border' />
              <p className='mt-2'>Loading tasks...</p>
            </div>
          ) : (
            <Row className='g-3'>

              {myTasks?.length > 0 ? (
                myTasks.map((task) => (
                  <Col
                    key={task._id}
                    xs={12}
                    sm={6}
                    lg={6}
                    xl={4}
                    className='d-flex'
                  >
                    <TaskCard
                      id={task._id}
                      title={task.title}
                      description={task.description}
                      priority={task.priority}
                      status={task.status}
                      role='user'
                      assignedTo={
                        typeof task.assignedTo === 'object'
                          ? task.assignedTo?.name
                          : task.assignedTo
                      }
                      dueDate={task.dueDate}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDelete}
                    />
                  </Col>
                ))
              ) : (
                <div className='text-center mt-4'>
                  <p>No tasks found</p>
                </div>
              )}

            </Row>
          )}

        </div>

      </Container>
    </section>
  )
}

export default MyTasksPage