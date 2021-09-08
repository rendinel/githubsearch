import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)
  //with the reduce we turn an array where we setup an array with the language as properties and as a value the number they are present inside the data from the api
  //we iterate through our array,we have 2 things the total we return and it's an obj and each every item
  const languages = repos.reduce((total, item) => {
    // we deconstruct the language from every repo(item)
    //we also deconstruct the star property
    const { language, stargazers_count } = item
    //we eliminate every time the language don't exist
    if (!language) return total
    //if the obj property don't exist we set to be equal to 1 otherwise with a label of language because the chart are looking for a label
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      }
    }
    console.log(language)

    return total
  }, {})
  //i want them as an array so i use object.values that
  //we return only the most 5 popular language of the user
  const mostUsed = Object.values(languages)
    //i sort based on values so the highest one will be first
    .sort((a, b) => {
      return b.value - a.value
    })
    .slice(0, 5)

  //most stars per language
  const mostPopular = Object.values(languages)
    .sort((a, b) => {
      return b.stars - a.stars
    })
    .map((item) => {
      return { ...item, value: item.stars }
    })
    .slice(0, 5)

  //star & forks,we grab stars and forks from our repos after a reduce method,infact we return a total that is equal to { stars: {}, forks: {} } and we have item that are the item inside repo,from repo we grab this property const { stargazers_count, name, forks } = item, then we setup a new property inside the stars object inside the total obj called stargazers_count  that is equal to total.stars[stargazers_count] = { label: name, value: stargazers_count },we do the same for forks

  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item
      total.stars[stargazers_count] = { label: name, value: stargazers_count }
      total.forks[forks] = { label: name, value: forks }
      return total
    },
    { stars: {}, forks: {} }
  )
  //we create an array that grab last 5 property from the obj we are passing and reverse them
  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  const chartData = [
    {
      label: 'HTML',
      value: '13',
    },
    {
      label: 'CSS',
      value: '160',
    },
    {
      label: 'Javascript',
      value: '80',
    },
  ]

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={mostUsed} />
        <Column3D data={stars} />
        <Doughnut2D data={mostPopular} />
        <Bar3D data={forks} />
      </Wrapper>
    </section>
  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
