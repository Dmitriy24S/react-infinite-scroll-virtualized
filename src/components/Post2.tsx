import { FC } from 'react'

interface Props {
  id: number
  title: string
  thumbnailUrl: string
}

const Post2: FC<Props> = ({ id, title, thumbnailUrl }) => {
  const truncatedString = title.length > 35 ? title.slice(0, 35).trim() + '...' : title

  return (
    <div key={id} className='card'>
      <img src={thumbnailUrl} alt='' loading='lazy' />
      <p>
        {id} - {truncatedString}
      </p>
    </div>
  )
}

export default Post2
