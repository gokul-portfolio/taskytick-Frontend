import React, { useEffect, useMemo } from 'react'
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap'
import { useUser } from '../../context/UserContext'
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts'
import { FiPieChart, FiBarChart2 } from 'react-icons/fi'
import { FiCheckSquare, FiCheckCircle, FiClock, FiUsers } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
const COLORS = ['#3498db', '#2ecc71', '#e74c3c']

const ReportPage = () => {
  const {
    tasks = [],
    users = [],
    fetchTasks,
    fetchUsers,
    dataLoading
  } = useUser()

  useEffect(() => {
    fetchTasks()
    fetchUsers()
  }, [])

  //  SUMMARY
  const summary = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(t => t.status === 'Done').length
    const pending = tasks.filter(t => t.status !== 'Done').length

    return { total, completed, pending }
  }, [tasks])
const navigate = useNavigate()
  //  STATUS DATA
  const statusData = [
    { name: 'Todo', value: tasks.filter(t => t.status === 'Todo').length },
    {
      name: 'In Progress',
      value: tasks.filter(t => t.status === 'In Progress').length
    },
    { name: 'Done', value: tasks.filter(t => t.status === 'Done').length }
  ]

  //  PRIORITY DATA
  const priorityData = [
    { name: 'High', value: tasks.filter(t => t.priority === 'High').length },
    {
      name: 'Medium',
      value: tasks.filter(t => t.priority === 'Medium').length
    },
    { name: 'Low', value: tasks.filter(t => t.priority === 'Low').length }
  ]

  if (dataLoading) {
    return (
      <div className='text-center mt-5'>
        <Spinner animation='border' />
      </div>
    )
  }

  return (
    <Container fluid>
      <div className='mb-4 d-flex flex-column gap-1'>
        <h4 className='main-head'>Reports Dashboard</h4>
        <small className='text-muted'>
          Track task performance, user activity, and overall project insights
        </small>
      </div>

      {/* SUMMARY CARDS */}
    <Row className='g-4 mb-4'>

  {/* TOTAL TASKS */}
  <Col xl={3} md={6}>
    <Card
      className='stat-box w-100 h-100 clickable'
      onClick={() => navigate('/admin/tasks')}
    >
      <FiCheckSquare className='stat-icon primary' />
      <p>Total Tasks</p>
      <h5>{summary.total}</h5>
    </Card>
  </Col>

  {/* COMPLETED */}
  <Col xl={3} md={6}>
    <Card
      className='stat-box w-100 h-100 clickable'
      onClick={() => navigate('/admin/tasks?status=done')}
    >
      <FiCheckCircle className='stat-icon success' />
      <p>Completed Tasks</p>
      <h5>{summary.completed}</h5>
    </Card>
  </Col>

  {/* PENDING */}
  <Col xl={3} md={6}>
    <Card
      className='stat-box w-100 h-100 clickable'
      onClick={() => navigate('/admin/tasks?status=pending')}
    >
      <FiClock className='stat-icon warning' />
      <p>Pending Tasks</p>
      <h5>{summary.pending}</h5>
    </Card>
  </Col>

  {/* USERS */}
  <Col xl={3} md={6}>
    <Card
      className='stat-box w-100 h-100 clickable'
      onClick={() => navigate('/admin/users')}
    >
      <FiUsers className='stat-icon info' />
      <p>Total Users</p>
      <h5>{users.length}</h5>
    </Card>
  </Col>

</Row>

      {/* CHARTS */}
      <Row className='mt-5'>
        {/* TASK STATUS */}
        <Col md={6}>
          <Card className='chart-box p-3 h-100'>
            {/* HEADER */}
            <div className='d-flex align-items-center gap-2 mb-3'>
              
              <h5 className='main-head m-0'> Task Status <FiPieChart className='chart-icon ' /> </h5>
            </div>

            {/* CHART */}
            <PieChart width={320} height={260}>
              <Pie data={statusData} dataKey='value' outerRadius={90}>
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </Card>
        </Col>

        {/* TASK PRIORITY */}
        <Col md={6}>
          <Card className='chart-box p-3 h-100'>
            <div className='d-flex align-items-center gap-2 mb-3'>
             
              <h5 className='main-head m-0'> Task Priority   <FiBarChart2 className='chart-icon' /></h5>
            </div>

            <BarChart width={320} height={260} data={priorityData}>
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='value' />
            </BarChart>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default ReportPage
