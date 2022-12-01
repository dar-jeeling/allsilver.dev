import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import dayjs from 'dayjs'

import './index.scss'

export const ThumbnailItem = ({ node }) => {
  const date = new dayjs(node.frontmatter.date).format('YY년 MM월 DD일')

  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div key={node.fields.slug}>
        <h3>{node.frontmatter.title || node.fields.slug}</h3>
        <p
          class="thumbnail-item"
          dangerouslySetInnerHTML={{ __html: node.excerpt }}
        />
        <span class="thumbnail-item__date">{date}</span>
      </div>
    </Link>
  )
}
