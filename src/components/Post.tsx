import { forwardRef } from 'react'

export interface IPost {
  id: number
  thumbnailUrl: string
  title: string
  body?: string
  url?: string
  albumId?: number
}

interface Props {
  post: IPost
}

const Post = forwardRef<HTMLElement, Props>(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </>
  )

  const content = ref ? (
    <article ref={ref}>{postBody}</article>
  ) : (
    <article>{postBody}</article>
  )

  return content
})

export default Post
