import React from 'react'
import { Link } from 'gatsby'

import './index.scss'

export const TagHeader = ({ tag }) => {
  return (
    <h2>
      Tag:
      <Link className="tag" to={`/tags/${tag}`}>
        #{tag}
      </Link>
    </h2>
  )
}
