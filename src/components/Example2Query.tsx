import { useCallback, useRef } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getPostsPage } from '../api/axios'
import Post from './Post'

// React Query

const Example2Query = () => {
  // const status: "idle" | "error" | "loading" | "success"
  const { status, error, data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery('/posts', async ({ pageParam = 1 }) => getPostsPage(pageParam), {
      getNextPageParam: (lastPage, allPages) => {
        console.log(
          'lastPage.length',
          lastPage.length,
          'allPages.length',
          allPages.length
        )
        // lastPage.length 0 allPages.length 11
        // lastPage.length 0 allPages.length 11
        // lastPage.length 0 allPages.length 11
        //
        // lastPage.length 10 allPages.length 1
        // lastPage.length 10 allPages.length 1
        // lastPage.length 10 allPages.length 1
        // lastPage.length 10 allPages.length 1
        // after 10 scroll
        //lastPage.length 10 allPages.length 2
        //lastPage.length 10 allPages.length 2
        //lastPage.length 10 allPages.length 2
        //lastPage.length 10 allPages.length 2

        // lastPage.length 10, allPages.length 1
        // lastPage.length 10, allPages.length 2
        // lastPage.length 10, allPages.length 3
        // lastPage.length 10, allPages.length 4
        // lastPage.length 10, allPages.length 5
        // lastPage.length 10, allPages.length 6
        // lastPage.length 10, allPages.length 7
        // lastPage.length 10, allPages.length 8
        // lastPage.length 10, allPages.length 9
        // lastPage.length 10, allPages.length 10
        // lastPage.length 0, allPages.length 11
        // lastPage.length 0, allPages.length 11
        // lastPage.length 0, allPages.length 11

        // if (lastPage.length < 10) return undefined
        // return allPages.length + 1
        return lastPage.length ? allPages.length + 1 : undefined
      },
    })

  // const lastPostRef = useRef<any>(null)
  const intObserver = useRef<any>(null)
  const lastPostRef = useCallback(
    (postElement: HTMLElement) => {
      if (isFetchingNextPage) return

      if (intObserver.current) intObserver.current.disconnect()

      intObserver.current = new IntersectionObserver((posts) => {
        if (posts[0].isIntersecting && hasNextPage) {
          console.log('we are near the last post')
          // setPageNum((prev) => prev + 1) // this going to update hook and send request
          fetchNextPage()
        }
      })

      if (postElement) intObserver.current.observe(postElement)
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  )

  if (error) {
    return (
      <div>
        <h4>Error</h4>
        {/* <p>{error?.message}</p> */}
        {/* // ! 'error' is of type 'unknown'.ts(18046) */}
      </div>
    )
  }

  // 'data' is possibly 'undefined'.ts(18048)
  const content = data?.pages.map((page) => {
    return page.map((post: any, index: number) => {
      if (page.length === index + 1) {
        return <Post ref={lastPostRef} key={post.id} post={post} />
        // ! Type '{ ref: (postElement: HTMLElement) => void; key: any; post: any; }' is not assignable to type 'IntrinsicAttributes & Props'.
        // ! Property 'ref' does not exist on type 'IntrinsicAttributes & Props'.
      }

      return <Post key={post.id} post={post} />
    })
  })

  return (
    <div>
      <h1 id='top'>
        &infin; Infinite Query &amp; Scroll
        <br />
        &infin; Ex. 2 - React Query
      </h1>
      {content}
      {isFetchingNextPage && <p>Loading...</p>}
      <p className='center'>
        <a href='#top'>Back to Top</a>
      </p>
    </div>
  )
}

export default Example2Query
