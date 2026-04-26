import React from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import { useUser } from '../../context/UserContext'
// ICONS (single import – IMPORTANT)
import {
  FiBell,
  FiCalendar,
  FiUsers,
  FiBriefcase,
  FiCheckSquare,
  FiPlus
} from 'react-icons/fi'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

import Button from '../../components/common/Button'
import TaskCard from '../../components/user/TaskCard'

import note from '../../assets/images/home/notes.png'

const DashboardPage = () => {
  const {
    users,
    tasks,
    projects,
    fetchUsers,
    fetchTasks,
    fetchProjects, // 🔥 ADD THIS
    currentUser,
    deleteTask,
    updateTask
  } = useUser()

  useEffect(() => {
    fetchUsers()
    fetchTasks()
    fetchProjects()
  }, [])
  const stats = useMemo(() => {
    const totalUsers = users.length
    const totalTasks = tasks.length

    const pendingTasks = tasks.filter(t => t.status === 'not-started').length

    const completedTasks = tasks.filter(t => t.status === 'completed').length

    const highPriorityTasks = tasks.filter(t => t.priority === 'High')

    return {
      totalUsers,
      totalTasks,
      pendingTasks,
      completedTasks,
      highPriorityTasks
    }
  }, [users, tasks])

  const navigate = useNavigate()

  const handleNotification = () => {
    console.log('Notification clicked')
  }

  return (
    <section className='dashboard-section'>
      <Container fluid>
        {/* ================= HEADER ================= */}
        <div className='dashboard-top d-flex justify-content-between align-items-center'>
          <h4 className='mb-0 fw-semibold'>Dashboard</h4>

          <div className='d-flex align-items-center gap-3'>
            <Button
              label='Add Task'
              icon={<FiPlus />}
              onClick={() => navigate('tasks/create')}
            />
          </div>
        </div>

        {/*================================ parent dashboard */}
        <div className='dashboard-content-wrap'>
          <Row className='mt-4 align-items-stretch'>
            <Col lg={8} className='d-flex'>
              <Card className='welcome-card p-3 d-flex flex-row justify-content-between align-items-center w-100 h-100'>
                <div>
                  <h1 className='mb-2'>
                    Welcome, {currentUser?.name || 'User'} 👋
                  </h1>

                  <p className='text-muted mb-3'>
                    Monitor system activity and manage platform operations
                  </p>

                  {/* 🔥 CLEAN ACTIONS */}
                  <div className='welcome-actions d-flex flex-wrap gap-3'>
                    <span
                      onClick={() => navigate('/admin/users')}
                      className='clickable'
                    >
                      <FiUsers className='me-1' />
                      Manage Users
                    </span>

                    <span
                      onClick={() => navigate('/admin/projects')}
                      className='clickable'
                    >
                      <FiBriefcase className='me-1' />
                      Projects
                    </span>

                    <span
                      onClick={() => navigate('/admin/tasks')}
                      className='clickable'
                    >
                      <FiCheckSquare className='me-1' />
                      Tasks
                    </span>
                  </div>
                </div>

                {/* 🔥 IMAGE */}
                <img
                  src={note}
                  alt='admin dashboard'
                  className='welcome-img'
                  style={{ maxWidth: '180px' }}
                />
              </Card>
            </Col>

            <Col lg={4} className='d-flex'>
              <Card className='side-card w-100 h-100 p-3'>
                <h1 className='main-head mb-3'>Today</h1>

                <div className='calendar-wrapper'>
                  <Calendar
                    value={new Date()}
                    onChange={date => console.log(date)}
                  />
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        {/* ================================notes and general detail */}
        <div className='dashboard-content-wrap'>
          <Row className='mt-4 align-items-stretch'>
            {/* NOTES */}
            <Col lg={4} className='d-flex order-2 order-lg-1'>
              <Card className='important-notes-card p-3 w-100 h-100'>
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <h1 className='main-head mb-3'>Important Notes</h1>

                  <span
                    className='view-all-btn'
                    onClick={() => navigate('/notes')}
                  >
                    View All
                  </span>
                </div>

                {/* 🔥 STATIC → later dynamic pannalaam */}
                <div className='notes-list flex-grow-1'>
                  {[
                    {
                      title: 'Client meeting',
                      desc: 'Discuss dashboard',
                      time: '2 min ago',
                      type: 'high'
                    },
                    {
                      title: 'Fix login API',
                      desc: 'Token issue',
                      time: '10 min ago',
                      type: 'medium'
                    },
                    {
                      title: 'Design UI',
                      desc: 'Modern layout',
                      time: '30 min ago',
                      type: 'low'
                    }
                  ].map((note, i) => (
                    <div key={i} className='note-item'>
                      <div className={`note-dot ${note.type}`}></div>
                      <div className='note-content'>
                        <h6>{note.title}</h6>
                        <p>{note.desc}</p>
                        <span className='note-time'>{note.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>

            {/* STATS */}
            <Col lg={8} className='d-flex order-1 order-lg-2'>
              <Card className='w-100 h-100 stat-container p-2 border-0 bg-transparent'>
                <Row className='h-100'>
                  {/* USERS */}
                  <Col md={4} sm={6} xs={6} className='mt-3 d-flex'>
                    <Card
                      className='stat-box w-100 h-100'
                      onClick={() => navigate('/admin/users')}
                    >
                      <FiUsers />
                      <p>Total Users</p>
                      <h5>{users?.length || 0}</h5>
                    </Card>
                  </Col>

                  {/* TASKS */}
                  <Col md={4} sm={6} xs={6} className='mt-3 d-flex'>
                    <Card
                      className='stat-box w-100 h-100'
                      onClick={() => navigate('/admin/tasks')}
                    >
                      <FiCheckSquare />
                      <p>Total Tasks</p>
                      <h5>{tasks?.length || 0}</h5>
                    </Card>
                  </Col>

                  {/* PENDING TASKS */}
                  <Col md={4} sm={6} xs={6} className='mt-3 d-flex'>
                    <Card
                      className='stat-box w-100 h-100'
                      onClick={() => navigate('/admin/tasks?status=pending')}
                    >
                      <FiCheckSquare />
                      <p>Tasks Waiting Approval</p>
                      <h5>
                        {tasks.filter(t => t.status === 'not-started').length}
                      </h5>
                    </Card>
                  </Col>

                  {/* ALERTS */}
                  <Col md={4} sm={6} xs={6} className='mt-3 d-flex'>
                    <Card
                      className='stat-box w-100 h-100'
                      onClick={() => navigate('/admin/alerts')}
                    >
                      <FiBell />
                      <p>System Alerts</p>
                      <h5>
                        {
                          tasks.filter(
                            t =>
                              t.dueDate &&
                              new Date(t.dueDate) < new Date() &&
                              t.status !== 'completed'
                          ).length
                        }
                      </h5>
                    </Card>
                  </Col>

                  {/* PROJECTS */}
                  <Col md={4} sm={6} xs={6} className='mt-3 d-flex'>
                    <Card
                      className='stat-box w-100 h-100'
                      onClick={() => navigate('/admin/projects')}
                    >
                      <FiBriefcase />
                      <p>Total Projects</p>
                      <h5>{projects?.length || 0}</h5>
                    </Card>
                  </Col>

                  {/* PENDING PROJECTS */}
                  <Col md={4} sm={6} xs={6} className='mt-3 d-flex'>
                    <Card
                      className='stat-box w-100 h-100'
                      onClick={() => navigate('/admin/projects?status=pending')}
                    >
                      <FiBriefcase />
                      <p>Projects Waiting Approval</p>
                      <h5>
                        {projects.filter(p => p.status === 'Inactive').length}
                      </h5>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>

        {/* project tracker */}
        <div className='dashboard-content-wrap'>
          <h1 className='mt-4 mb-2 main-head'>Task Metrics</h1>

          <Row className='h-100 justify-content-center'>
            {/* TOTAL TASKS */}
            <Col lg={3} md={4} sm={6} xs={6} className='mt-3 d-flex'>
              <Card className='stat-box w-100 h-100'>
                <FiCheckSquare />
                <p>Total Tasks</p>
                <h5>{stats?.totalTasks || 0}</h5>
              </Card>
            </Col>

            {/* COMPLETED % */}
            <Col lg={3} md={4} sm={6} xs={6} className='mt-3 d-flex'>
              <Card className='stat-box w-100 h-100'>
                <FiCheckSquare />
                <p>Completed</p>
                <h5>
                  {stats?.totalTasks > 0
                    ? Math.round(
                        (stats.completedTasks / stats.totalTasks) * 100
                      )
                    : 0}
                  %
                </h5>
              </Card>
            </Col>

            {/* OVERDUE TASKS */}
            <Col lg={3} md={4} sm={6} xs={6} className='mt-3 d-flex'>
              <Card className='stat-box w-100 h-100'>
                <FiBell />
                <p>Overdue Tasks</p>
                <h5>
                  {
                    (tasks || []).filter(
                      t =>
                        t?.dueDate &&
                        new Date(t.dueDate) < new Date() &&
                        t?.status !== 'completed'
                    ).length
                  }
                </h5>
              </Card>
            </Col>

            {/* HIGH PRIORITY */}
            <Col lg={3} md={4} sm={6} xs={6} className='mt-3 d-flex'>
              <Card className='stat-box w-100 h-100'>
                <FiBell />
                <p>High Priority</p>
                <h5>{stats?.highPriorityTasks?.length || 0}</h5>
              </Card>
            </Col>
          </Row>
        </div>

        {/* peoject meterics */}
        <div className='dashboard-content-wrap'>
          <h5 className='mb-2 main-head'>Project Metrics</h5>

          <Row className='h-100'>
            {/* ACTIVE PROJECTS */}
            <Col md={4} sm={6} className='mt-3 d-flex'>
              <Card className='stat-box w-100 h-100'>
                <FiBriefcase />
                <p>Active Projects</p>
                <h5>
                  {
                    new Set(
                      (tasks || [])
                        .filter(t => t?.project) // ✅ safe check
                        .map(t => t.project)
                    ).size
                  }
                </h5>
              </Card>
            </Col>

            {/* PROJECTS AT RISK */}
            <Col md={4} sm={6} className='mt-3 d-flex'>
              <Card className='stat-box w-100 h-100'>
                <FiBell />
                <p>Projects at Risk</p>
                <h5>
                  {
                    new Set(
                      (tasks || [])
                        .filter(
                          t =>
                            t?.project && // ✅ must have project
                            t?.dueDate &&
                            new Date(t.dueDate) < new Date() &&
                            t?.status !== 'completed'
                        )
                        .map(t => t.project)
                    ).size
                  }
                </h5>
              </Card>
            </Col>

            {/* PROJECTS COMPLETED */}
            <Col md={4} sm={6} className='mt-3 d-flex'>
              <Card className='stat-box w-100 h-100'>
                <FiBriefcase />
                <p>Projects Completed</p>
                <h5>
                  {
                    new Set(
                      (tasks || [])
                        .filter(
                          t =>
                            t?.project && // ✅ safe
                            t?.status === 'completed'
                        )
                        .map(t => t.project)
                    ).size
                  }
                </h5>
              </Card>
            </Col>
          </Row>
        </div>

        {/* high priority */}
        <div className='dashboard-content-wrap'>
          <h1 className='main-head mb-3'>
            High Priority – Requires Admin Action
          </h1>

          <Row>
            {(stats?.highPriorityTasks?.length || 0) > 0 ? (
              stats.highPriorityTasks.map(task => (
                <Col md={6} key={task._id} className='mb-3'>
                  <TaskCard
                    id={task._id}
                    title={task?.title}
                    description={task?.description}
                    priority={task?.priority?.toLowerCase() || 'medium'}
                    status={task?.status || 'not-started'}
                    dueDate={
                      task?.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : null
                    }
                    assignedTo={task?.assignedTo?.name || 'Unassigned'}
                    role='admin'
                    onDelete={deleteTask}
                    onStatusChange={(id, status) => updateTask(id, { status })}
                  />
                </Col>
              ))
            ) : (
              <Col>
                <p className='text-muted'>
                  No high-priority tasks require admin action today.
                </p>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </section>
  )
}

export default DashboardPage
