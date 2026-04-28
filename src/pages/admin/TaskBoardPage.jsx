import React, { useEffect, useMemo, useState } from 'react'
import { Container, Row, Col, Card, Spinner, Badge } from 'react-bootstrap'
import { useUser } from '../../context/UserContext'

import {
  FiTrash,
  FiUser,
  FiCalendar,
  FiBriefcase
} from 'react-icons/fi'

// STATUS MAP
const STATUS_MAP = {
  todo: 'Todo',
  inProgress: 'In Progress',
  done: 'Done'
}

// COLUMNS
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
    dataLoading
  } = useUser()

  const [dragTask, setDragTask] = useState(null)

  //  FETCH TASKS
  useEffect(() => {
    fetchTasks()
  }, [])

  //  GROUP TASKS
  const grouped = useMemo(() => ({
    todo: tasks.filter(t => t.status === 'Todo'),
    inProgress: tasks.filter(t => t.status === 'In Progress'),
    done: tasks.filter(t => t.status === 'Done')
  }), [tasks])

  //  DRAG START
  const onDragStart = (task) => {
    setDragTask(task)
  }

  //  DROP (DB UPDATE + REFRESH)
  const onDrop = async (statusKey) => {
    if (!dragTask) return

    const newStatus = STATUS_MAP[statusKey]

    try {
      await updateTask(dragTask._id, { status: newStatus })

      //  IMPORTANT: REFRESH FROM DB
      await fetchTasks()

    } catch (err) {
      console.error(err)
      alert('❌ Failed to update task')
    }

    setDragTask(null)
  }

  const onDragOver = (e) => e.preventDefault()

  //  DELETE
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return

    try {
      await deleteTask(id)

      //  REFRESH AFTER DELETE
      await fetchTasks()

    } catch (err) {
      console.error(err)
      alert('❌ Delete failed')
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

  //  EMPTY STATE
  if (tasks.length === 0) {
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

              {/* TASK LIST */}
              {grouped[col.key].map(task => (
                <Card
                  key={task._id}
                  draggable
                  onDragStart={() => onDragStart(task)}
                  className="task-card mb-3 shadow-sm"
                >
                  <Card.Body>

                    {/* TITLE */}
                    <h6 className="task-title">
                      {task.title}
                    </h6>

                    {/* DESCRIPTION */}
                    <p className="task-desc">
                      {task.description?.slice(0, 60)}...
                    </p>

                    {/* USER */}
                    <div className="task-info">
                      <FiUser /> {task.assignedTo?.name || 'Unassigned'}
                    </div>

                    {/* DEPARTMENT */}
                    <div className="task-info">
                      <FiBriefcase /> {task.assignedTo?.department || 'No Dept'}
                    </div>

                    {/* DATE */}
                    {task.dueDate && (
                      <div className="task-info">
                        <FiCalendar /> {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    )}

                    {/* FOOTER */}
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