import React, { FC, forwardRef } from 'react'

interface Props {
  post: any
}

const Post: FC<Props> = forwardRef(({ post }, ref) => {
  const postBody = (
    <>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Post ID: {post.id}</p>
    </>
  )

  // (parameter) ref: ((instance: unknown) => void) | React.MutableRefObject<unknown>
  const content = ref ? (
    <article ref={ref}>{postBody}</article> // ! Type '((instance: unknown) => void) | MutableRefObject<unknown>' is not assignable to type 'LegacyRef<HTMLElement> | undefined'.
  ) : (
    <article>{postBody}</article>
  )

  return content
})

export default Post
