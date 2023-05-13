import { useVirtualizer } from '@tanstack/react-virtual'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import Example1React from './components/Example1React'
import Example2Query from './components/Example2Query'
import Example3Query2 from './components/Example3Query2'

function App() {
  // `https://jsonplaceholder.typicode.com/albums/${pageParam}/photos`

  return (
    <>
      <h1>Infinite Loading</h1>
      <div className='list'></div>
      {/* <Example1React /> */}
      {/* <Example2Query /> */}
      <Example3Query2 />
    </>
  )
}

export default App
