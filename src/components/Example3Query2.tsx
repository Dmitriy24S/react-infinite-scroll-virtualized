import axios from 'axios'
import React, { Fragment, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { useInfiniteQuery } from 'react-query'
import Post2 from './Post2'

const Example3Query2 = () => {
  const { ref, inView } = useInView()

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    'posts2',
    async ({ pageParam = 1 }) => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/albums/${pageParam}/photos`
      )
      console.log('fetching')
      // console.log('res.data', res.data)
      // res.data
      // (50) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
      // 0:  {albumId: 1, id: 1, title: 'accusamus beatae ad facilis cum similique qui sunt', url: 'https://via.placeholder.com/600/92c952', thumbnailUrl: 'https://via.placeholder.com/150/92c952'}
      return res.data
    },
    {
      // getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
      // getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1
        // const nextPage = lastPage.length === LIMIT ? allPages.length + 1 : undefined;
        return nextPage
      },
    }
  )

  useEffect(() => {
    if (inView && hasNextPage) {
      console.log('reach last item')
      fetchNextPage()
    }
  }, [inView, fetchNextPage, hasNextPage])

  console.log('data', data)
  // pageParams: Array(2)
  // 0: undefined
  // 1: 2
  // pages: Array(2)
  // 0: (50) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
  // 1: (50

  return (
    <>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>Error</p>}

      <div className='container'>
        {data?.pages?.map((page, index) => (
          <Fragment key={index}>
            {page.map((item: any, index: number) => (
              <Post2 id={item.id} title={item.title} thumbnailUrl={item.thumbnailUrl} />
            ))}
          </Fragment>
        ))}
      </div>

      {/* or key here for fetch more like in docs example  */}
      {data?.pages && (
        <div ref={ref} className='fetchInfo'>
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load Newer'
            : 'Nothing more to load'}
        </div>
      )}
    </>
  )
}

export default Example3Query2
