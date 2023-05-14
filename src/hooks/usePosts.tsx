import { useEffect, useState } from 'react'
import { getPostsPage } from '../api/axios'

const usePosts = (pageNum = 1) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [error, setError] = useState<any>({})
  const [results, setResults] = useState<any[]>([])
  const [hasNextPage, setHasNextPage] = useState(false) // !

  useEffect(() => {
    setIsLoading(true)
    setIsError(false)
    setError({})

    const controller = new AbortController()
    const signal = controller.signal

    // fetch('https://jsonplaceholder.typicode.com/posts', { signal })
    getPostsPage(pageNum, { signal })
      .then((data) => {
        // setResults(data)
        setResults((prev) => [...prev, ...data])
        setHasNextPage(Boolean(data.length)) // !
        console.log('hasNextPage Boolean(data.length)', Boolean(data.length))
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        if (signal.aborted) return
        setIsError(true)
        setError({ message: err.message })
        console.log('getPostsPage err:', err)
      })

    return () => {
      controller.abort()
    }
  }, [pageNum])

  return { isLoading, isError, error, results, hasNextPage }
}

export default usePosts
