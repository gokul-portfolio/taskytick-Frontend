import React from 'react'
import {
  FiUser,
  FiMail,
  FiBriefcase,
  FiCalendar,
  FiUsers,
  FiCheckCircle,
  FiEdit,
  FiTrash2,
  FiPhone,
  FiMapPin
} from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate()

  return (
    <div className='user-card'>
      {/* HEADER */}
      <div className='user-card-header'>
        <h4 className='user-name'>
          <FiUser className='icon title-icon' />
          {user.name}
        </h4>

        <span className={`user-status ${user.statusClass}`}>
          <FiCheckCircle className='icon' />
          {user.status}
        </span>
      </div>

      {/* CONTACT */}
      <div className='user-contact'>
        <p>
          <FiMail className='icon' />
          {user.email}
        </p>

        <p>
          <FiPhone className='icon' />
          {user.phone}
        </p>

        <p>
          <FiMapPin className='icon' />
          {user.address}
        </p>
      </div>

      {/* INFO GRID */}
      <div className='user-info-grid'>
        <div className='info-item'>
          <span className='label'>
            <FiBriefcase className='icon' />
            Role
          </span>
          <span className='value'>{user.role}</span>
        </div>

        <div className='info-item'>
          <span className='label'>
            <FiCalendar className='icon' />
            Joined
          </span>
          <span className='value'>{user.joinedDate}</span>
        </div>
      </div>

      {/* FOOTER */}
      {/* <div className='user-card-footer'>
        <span className='user-team-badge'>{user.team}</span>
      </div> */}

      {/* ACTIONS */}
      <div className='user-actions'>
        <button
          className='action-btn edit-btn'
          onClick={() => navigate(`/admin/users/edit/${user.id}`)}
        >
          <FiEdit /> <span>Edit</span>
        </button>

        <button className='action-btn delete-btn' onClick={onDelete}>
          <FiTrash2 /> <span>Delete</span>
        </button>
      </div>
    </div>
  )
}

export default UserCard
