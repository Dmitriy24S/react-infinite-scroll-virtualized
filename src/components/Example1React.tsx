import { useCallback, useRef, useState } from 'react'
import usePosts from '../hooks/usePosts'
import Post from './Post'

// React only infinite scroll

const Example1React = () => {
  const [pageNum, setPageNum] = useState(1)
  const { isLoading, isError, error, results, hasNextPage } = usePosts(pageNum)
  // const lastPostRef = useRef<JSX.IntrinsicElements['article']>(null)
  // const lastPostRef = useRef<any>(null)
  const intObserver = useRef()
  const lastPostRef = useCallback(
    (post) => {
      if (isLoading) return

      if (intObserver.current) intObserver.current.disconnect() // ! Property 'disconnect' does not exist on type 'never'.ts(2339)

      // ! Type 'IntersectionObserver' is not assignable to type 'undefined'.
      // intObserver.current = new IntersectionObserver(entries => {
      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('we are near the last post')
          setPageNum((prev) => prev + 1) // this going to update hook and send request
        }
      })

      // ! 'intObserver.current' is possibly 'undefined'.ts(18048)
      if (post) intObserver.current.observe(post)
    },
    [isLoading, hasNextPage]
  )

  if (isError) {
    return (
      <div>
        <h4>Error</h4>
        <p>{error.message}</p>
        // ! Property 'message' does not exist on type '{}'.ts(2339) // any mess add
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
