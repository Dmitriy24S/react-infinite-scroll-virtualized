import { useCallback, useRef, useState } from 'react'
import usePosts from '../hooks/usePosts'
import Post from './Post'

// React only infinite scroll

const Example1React = () => {
  const [pageNum, setPageNum] = useState(1)
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum)
  // const lastPostRef = useRef<any>(null)
  // const intObserver = useRef<any>()
  const intObserver = useRef<IntersectionObserver | null>(null)
  const lastPostRef = useCallback(
    (postElement: HTMLElement) => {
      if (isLoading) return

      if (intObserver.current) intObserver.current.disconnect()

      // intObserver.current = new IntersectionObserver(entries => {
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('we are near the last post')
          setPageNum((prev) => prev + 1) // this going to update hook and send request
        }
      })

      if (postElement) intObserver.current.observe(postElement)
    },
    [isLoading, hasNextPage]
  )

  if (isError) {
    return (
      <div>
        <h4>Error</h4>
        <p>{error.message}</p>
      </div>
    )
  }

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }

  const content = results.map((post, index) => {
    if (results.length === index + 1) {
      return <Post ref={lastPostRef} key={post.id} post={post} />
    }

    return <Post key={post.id} post={post} />
  })

  return (
    <div>
      <h1 id='top'>
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 1 - React only
      </h1>
      {content}
      {isLoading && <p>Loading...</p>}
      <p className='center'>
        <a href='#top'>Back to Top</a>
      </p>
    </div>
  )
}

export default Example1React
