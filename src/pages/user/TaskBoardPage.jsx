import React, { useEffect, useMemo, useState } from 'react'
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap'
import { useUser } from '../../context/UserContext'
import { FiTrash, FiUser, FiCalendar, FiBriefcase } from 'react-icons/fi'

//  STATUS MAP (consistent backend values)
const STATUS_MAP = {
  todo: 'not-started',
  inProgress: 'in-progress',
  done: 'completed'
}

//  COLUMN CONFIG
const columns = [
  { key: 'todo', title: 'Todo' },
  { key: 'inProgress', title: 'In Progress' },
  { key: 'done', title: 'Done' }
]

const TaskBoardPage = () => {
  const {
    tasks = [],
    fetchTasks,
    updateTask,
    deleteTask,
    currentUser,
    dataLoading
  } = useUser()

  const [dragTask, setDragTask] = useState(null)
  const [localTasks, setLocalTasks] = useState([])

  //  FETCH
  useEffect(() => {
    fetchTasks()
  }, [])

  //  USER FILTER + LOCAL STATE
  useEffect(() => {
    const filtered = tasks.filter((t) => {
      const assignedId =
        typeof t.assignedTo === 'object'
          ? t.assignedTo?._id
          : t.assignedTo

      return (
        assignedId === currentUser?._id ||
        t.userId === currentUser?._id
      )
    })

    setLocalTasks(filtered)
  }, [tasks, currentUser])

  //  GROUPING
  const grouped = useMemo(() => ({
    todo: localTasks.filter(t => t.status === 'not-started'),
    inProgress: localTasks.filter(t => t.status === 'in-progress'),
    done: localTasks.filter(t => t.status === 'completed')
  }), [localTasks])

  //  DRAG START
  const onDragStart = (task) => {
    setDragTask(task)
  }

  //  DROP (Optimistic UI)
  const onDrop = async (statusKey) => {
    if (!dragTask) return

    const newStatus = STATUS_MAP[statusKey]

    //  Optimistic UI update
    setLocalTasks(prev =>
      prev.map(t =>
        t._id === dragTask._id ? { ...t, status: newStatus } : t
      )
    )

    try {
      await updateTask(dragTask._id, { status: newStatus })
    } catch (err) {
      console.error(err)
      alert('❌ Failed to update task')

      // rollback
      fetchTasks()
    }

    setDragTask(null)
  }

  const onDragOver = (e) => e.preventDefault()

  //  DELETE (Optimistic)
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return

    // remove instantly
    setLocalTasks(prev => prev.filter(t => t._id !== id))

    try {
      await deleteTask(id)
    } catch (err) {
      console.error(err)
      alert('❌ Delete failed')
      fetchTasks()
    }
  }

  //  LOADING
  if (dataLoading) {
    return (
      <div className="board-loading text-center mt-5">
        <Spinner animation="border" />
        <p>Loading tasks...</p>
      </div>
    )
  }

  //  EMPTY
  if (localTasks.length === 0) {
    return (
      <div className="text-center mt-5">
        <h5>No Tasks Found</h5>
      </div>
    )
  }

  return (
    <Container fluid className="task-board">
      <h2 className="board-title mb-4">Task Board</h2>

      <Row>
        {columns.map(col => (
          <Col key={col.key} md={4}>
            <div
              className={`board-column ${col.key}`}
              onDrop={() => onDrop(col.key)}
              onDragOver={onDragOver}
            >

              {/* HEADER */}
              <div className="column-header">
                <h5>{col.title}</h5>
                <span>{grouped[col.key].length}</span>
              </div>

              {/* TASKS */}
              {grouped[col.key].map(task => (
                <Card
                  key={task._id}
                  draggable
                  onDragStart={() => onDragStart(task)}
                  className="task-card mb-3 shadow-sm"
                >
                  <Card.Body>

                    <h6 className="task-title">{task.title}</h6>

                    <p className="task-desc">
                      {task.description?.slice(0, 60)}...
                    </p>

                    <div className="task-info">
                      <FiUser /> {task.assignedTo?.name || 'Unassigned'}
                    </div>

                    <div className="task-info">
                      <FiBriefcase /> {task.assignedTo?.department || 'No Dept'}
                    </div>

                    {task.dueDate && (
                      <div className="task-info">
                        <FiCalendar />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}

                    <div className="task-footer d-flex justify-content-between mt-2">
                      <Badge className={`priority ${task.priority?.toLowerCase()}`}>
                        {task.priority}
                      </Badge>

                      <FiTrash
                        className="delete-icon"
                        onClick={() => handleDelete(task._id)}
                      />
                    </div>

                  </Card.Body>
                </Card>
              ))}

            </div>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default TaskBoardPage