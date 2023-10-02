import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getDashboardDetails } from '../../redux/dashboardReducer';
import './Dashboard.css'
import axios from "axios";

const Dashboard = () => {
  const dispatch = useDispatch()

  const dashboardData = useSelector(state => state.dashboard.data)
  console.log("dashboarddata", dashboardData)
  const role = localStorage.getItem("role")
  useEffect(() => {
    document.body.classList.add("dahboard-page");
    return () => {
      document.body.classList.remove("dahboard-page");
    };
  }, []);
  useEffect(() => {
    // dispatch(getDashboardDetails())

    let token = localStorage.getItem("token")
    let config = {
      method: 'get',
      url: `http://localhost:8000/api/dashboard/get`,
      headers: {
          'Authorization': `Bearer ${token}`
      }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    console.log("hello test")
  })
  .catch((error) => {
    console.log(error);
  });
  }, [])




  return (
    <>
      <div className='dash-container'>
        <div className='dash-main'>
          <div className='dash-left-sec'>
            {role === "user" ?
              <div className='dash-project'>
                <div style={{ margin: "26px" }}>
                  <h2>{dashboardData?.data?.TotalTasks} </h2><br></br>
                  <p>Total Tasks</p>
                </div>
                <div className='img-background'>
                  <img src="/img/totalProjects.png" alt='total projects' />
                </div>

              </div> :
              <div className='dash-project'>
                <div style={{ margin: "26px" }}>
                  <h2>{dashboardData?.data?.TotalProjects} </h2><br></br>
                  <p>Total Projects</p>
                </div>
                <div className='img-background'>
                  <img src="/img/totalProjects.png" alt='total projects' />
                </div>

              </div>}
            {role === "user" ?
              <div className='dash-clients'>
                <div style={{ margin: "26px" }}>
                  <h2>{dashboardData?.data?.CompletedTasks}</h2><br></br>
                  <p>Completed Tasks</p>
                </div>
                <div className='img-background'>
                  <img src="/img/totalClients.png" alt='total clients' />
                </div>
              </div> :
              role==="manager"?
              <div className='dash-clients'>
                <div style={{ margin: "26px" }}>
                  <h2>{dashboardData?.data?.TotalTasks}</h2><br></br>
                  <p>Total Tasks</p>
                </div>
                <div className='img-background'>
                  <img src="/img/totalClients.png" alt='total clients' />
                </div>
              </div>
              :
              <div className='dash-clients'>
                <div style={{ margin: "26px" }}>
                  <h2>{dashboardData?.data?.TotalClients}</h2><br></br>
                  <p>Total Clients</p>
                </div>
                <div className='img-background'>
                  <img src="/img/totalClients.png" alt='total clients' />
                </div>
              </div>}
            <div className='pending-main'>
              {role === "user" ? <div className='pending-project'>
                <div className='pending-img'>
                  <img src="/img/pendingProjects.png" alt='pending projects' />
                </div>
                <div className='pending-right-sec'>
                  <h3>{dashboardData?.data?.PendingTasks}</h3>
                  <span>Pending Tasks</span>
                </div>
              </div> : <div className='pending-project'>
                <div className='pending-img'>
                  <img src="/img/pendingProjects.png" alt='pending projects' />
                </div>
                <div className='pending-right-sec'>
                  <h3>{dashboardData?.data?.PendingProjects}</h3>
                  <span>Pending Projects</span>
                </div>
              </div>}
              {role === "user" ? <div className='pending-tasks'>
                <div className='pending-img-two'>
                  <img src="/img/pendingTasks.png" alt='pending tasks' />
                </div>
                <div className='pending-right-sec-two'>
                  <h3>{dashboardData?.data?.DeadlineProjects}</h3>
                  <span>Deadline Projects</span>
                </div>
              </div> :
                <div className='pending-tasks'>
                  <div className='pending-img-two'>
                    <img src="/img/pendingTasks.png" alt='pending tasks' />
                  </div>
                  <div className='pending-right-sec-two'>
                    <h3>{dashboardData?.data?.DeadlineProjects}</h3>
                    <span>Deadline Projects</span>
                  </div>
                </div>}
            </div>
          </div>
          <div className='dash-bottom-sec'>
            <div className='bottom-left-sec'>
              {role === "user" ? dashboardData?.data?.ProjectInfo?.map((e, i) => (
                <div className='projects-main'>
                  <div className='projects-card1'>
                    <div className='projects-table-head'>
                      <span>{e.project_name} - Retail Insights</span>
                      <br></br>
                      <span>BA : {e.manager_name}</span>
                    </div>
                    <div className='projects-table-main'>
                      <span>Resource</span>
                      <span>Completed Tasks</span>
                      <span>Pending Tasks</span>
                      <span>graph</span>
                    </div>
                    <div className='projects-table'>
                      <span>{e?.users_tasks?.name}</span>
                      <span>{e?.users_tasks?.tasks_completed}</span>
                      <span>{e?.users_tasks?.tasks_pending}</span>
                      <span>
                        <progress className="project-progress" value={ (e?.users_tasks?.tasks_completed / (e?.users_tasks?.tasks_completed + e?.users_tasks?.tasks_pending))*100} max="100">
                        </progress>
                      </span>
                      </div>

                  </div>
                  <div>
                  </div>
                </div>
              )) :
                dashboardData?.data?.ProjectInfo?.map((e, i) => (
                  <div className='projects-main'>
                    <div className='projects-card1'>
                      <div className='projects-table-head'>
                        <span>{e.project_name} - Retail Insights</span>
                        <br></br>
                        <span>BA : {e.manager_name}</span>
                      </div>
                      <div className='projects-table-main'>
                        <span>Resource</span>
                        <span>Completed Tasks</span>
                        <span>Pending Tasks</span>
                        <span>graph</span>
                      </div>
                      {e?.users_tasks?.map(item => (
                        <div className='projects-table'>
                          <span>{item?.name}</span>
                          <span>{item?.tasks_completed}</span>
                          <span>{item?.tasks_pending}</span>
                          <span>
                            <progress className="project-progress" value={ (item?.tasks_completed / (item?.tasks_completed + item?.tasks_pending))*100} max="100">
                            </progress>
                          </span>
                        </div>
                      ))}

                    </div>
                    <div>
                    </div>
                  </div>
                ))}

            </div>
            {role === "user" ? <div className='project-count'>
              <div className='project-count-top'>
                <span>Projects</span>
                <span>Tasks <br></br>Count</span>
              </div>
              {dashboardData?.data?.ProjectPendingTasks?.map((e, i) => (
                <div className='project-count-bottom'>
                  <div className='dfaf'>
                    <span>{e.project_name}</span>
                    <span>{e.tasks_count}</span>
                  </div>
                </div>
              ))}

            </div> : role === "manager" ?
            <div className='project-count'>
              <div className='project-count-top'>
                <span>Projects</span>
                <span>Tasks <br></br>Count</span>
              </div>
              {dashboardData?.data?.ProjectTasks?.map((e, i) => (
                <div className='project-count-bottom'>
                  <div className='dfaf'>
                    <span>{e.project_name}</span>
                    <span>{e.tasks_count}</span>
                  </div>
                </div>
              ))}
            </div>
            :
            <div className='project-count'>
              <div className='project-count-top'>
                <span>Clients</span>
                <span>Project <br></br>Count</span>
              </div>
              {dashboardData?.data?.TempClientsProjects?.map((e, i) => (
                <div className='project-count-bottom'>
                  <div className='dfaf'>
                    <span>{e.client_name}</span>
                    <span>{e.projects_count}</span>
                  </div>
                </div>
              ))}
            </div>
            }
          </div>
        </div>
      </div>

    </>
  )
}

export default Dashboard