import { Link } from 'gatsby'
import React from 'react'

export const Tags = ({ tags }) => {
  return (
    <ul className="tags">
      {tags &&
        tags.map(tag => (
          <Link as="li" className="tags__item" to={`/tags/${tag}`} key={tag}>
            #{tag}
          </Link>
        ))}
    </ul>
  )
}
