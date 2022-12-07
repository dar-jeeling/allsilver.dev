import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import dayjs from 'dayjs'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import './index.scss'

export const ThumbnailItem = ({ node }) => {
  const date = new dayjs(node.frontmatter.date).format('YY년 MM월 DD일')
  const thumbnailImage = getImage(node.frontmatter.thumbnail)

  return (
    <Link className={`thumbnail ${TARGET_CLASS}`} to={node.fields.slug}>
      <div key={node.fields.slug}>
        {thumbnailImage && (
          <GatsbyImage
            image={thumbnailImage}
            alt={`thumbnail ${node.frontmatter.title}`}
            style={{
              borderRadius: '10px',
            }}
            class="thumbnail-image"
          />
        )}

        <h3 class="thumbnail-item__title">
          {node.frontmatter.title || node.fields.slug}
        </h3>

        <p
          class="thumbnail-item"
          dangerouslySetInnerHTML={{ __html: node.excerpt }}
        />

        <div class="thumnail-info__wrapper">
          <span class="thumbnail-item__date">{date}</span>
          <span class="thumbnail-item__category">
            {node.frontmatter.category}
          </span>
        </div>
      </div>
    </Link>
  )
}
