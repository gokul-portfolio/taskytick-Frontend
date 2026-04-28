import React, { useState, useEffect } from 'react'
import { FaFlag, FaCalendarAlt, FaTag, FaUser, FaTrash } from 'react-icons/fa'

const TaskCard = ({
  id,
  title = 'No Title',
  description = 'No Description',
  tags = [],
  priority = 'medium',
  status = 'not-started',
  dueDate,
  assignedTo = 'Unassigned',
  role = 'user',
  onStatusChange,
  onDelete 
}) => {
  const [taskStatus, setTaskStatus] = useState(status)
  const [updating, setUpdating] = useState(false)

  //  sync status
  useEffect(() => {
    setTaskStatus(status)
  }, [status])

  // UPDATE STATUS
  const handleStatusChange = async e => {
    if (updating) return

    const value = e.target.value
    setTaskStatus(value)

    if (onStatusChange) {
      try {
        setUpdating(true)
        await onStatusChange(id, value)
      } catch (err) {
        console.error('Status update failed', err)
        setTaskStatus(status) 
      } finally {
        setUpdating(false)
      }
    }
  }

  // DELETE HANDLER
  const handleDelete = () => {
    if (window.confirm('Are you sure to delete this task?')) {
      onDelete && onDelete(id)
    }
  }

  const formatPriority = (p = 'medium') =>
    p.charAt(0).toUpperCase() + p.slice(1)

  return (
    <div className={`task-card priority-${priority}`}>
      {/* HEADER */}
      <div className='task-card-header d-flex justify-content-between align-items-center'>
        <h4 className='task-title'>{title}</h4>

        <div className='d-flex align-items-center gap-2'>
          {/* STATUS */}
          <select
            className={`task-status-dropdown status-${taskStatus}`}
            value={taskStatus}
            onChange={handleStatusChange}
            disabled={updating}
          >
            <option value='not-started'>Not Started</option>
            <option value='in-progress'>In Progress</option>

            {role === 'admin' ? (
              <option value='completed'>Completed</option>
            ) : (
              <option value='closed'>Closed</option>
            )}
          </select>

          {/*  DELETE BUTTON */}
          {role === 'admin' && (
            <button
              className='delete-task-icon'
              onClick={handleDelete}
              title='Delete Task'
            >
              <FaTrash />
            </button>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className='task-desc'>{description}</p>

      {/* ASSIGNED USER */}
      <div className='task-assigned d-flex align-items-center gap-2'>
        <FaUser />
        <span>
          Assigned to <strong>{assignedTo || 'Unassigned'}</strong>
        </span>
      </div>

      {/* TAGS */}
      {tags?.length > 0 && (
        <div className='task-tags mt-2'>
          {tags.map((tag, i) => (
            <span key={i} className='task-tag me-2'>
              <FaTag /> {tag}
            </span>
          ))}
        </div>
      )}

      {/* FOOTER */}
      <div className='task-card-footer d-flex justify-content-between mt-3'>
        {/* PRIORITY */}
        <div className='task-meta d-flex align-items-center gap-1'>
          <FaFlag />
          <span className={`priority-text ${priority}`}>
            {formatPriority(priority)}
          </span>
        </div>

        {/* DUE DATE */}
        {dueDate && (
          <div className='task-meta d-flex align-items-center gap-1'>
            <FaCalendarAlt />
            <span>{dueDate}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskCard
