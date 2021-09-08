import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'
//create our createcontext,wrap inside a newcomponent where we access the provider
const GithubContext = React.createContext()

//Provider,Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  //we create 3 hooks to display our data at the moment from our mockData
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)
  //request loading
  const [requests, setRequests] = useState(0)
  //error
  const [loading, setIsLoading] = useState(false)
  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
        }
      })
      .catch((err) => console.log(err))
  }
  useEffect(checkRequests, [])
  return (
    <GithubContext.Provider value={{ githubUser, repos, followers, requests }}>
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
