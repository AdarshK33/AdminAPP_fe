import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './CustomLoader.css'

const CustomLoader = () => {
  const [loading, setLoading] = useState(false)

  const { client, project, task, user, login, email, dashboard } = useSelector(state => state)
  console.log("djdjdjkdkd", email)


  useEffect(() => {
    if (client.loading) {
      setLoading(true)
    } else if (project.loading) {
      setLoading(true)
    }
    else if (task.loading) {
      setLoading(true)
    }
    else if (user.loading) {
      setLoading(true)
    }
    else if (login.loading) {
      setLoading(true)
    }
    else if (email.loading) {
      setLoading(true)
    }
    else if (dashboard.loading) {
      setLoading(true)
    }
    else {
      setLoading(false)
    }
  }, [client.loading, project.loading, task.loading, user.loading, login.loading])
  return (
    <>
      {loading &&
        <div className='CustomLoaderContainer'>
          <div class="progress">
            <div class="indeterminate"></div>
          </div>
        </div>
      }
    </>
  )
}

export default CustomLoader