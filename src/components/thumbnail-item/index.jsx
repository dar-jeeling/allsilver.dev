import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import dayjs from 'dayjs'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import './index.scss'

export const ThumbnailItem = ({ node }) => {
  const date = new dayjs(node.frontmatter.date).format('YY년 MM월 DD일')
  const thumbnailImage = getImage(node.frontmatter.thumbnail)

  // console.log(node)
  const tags = node.frontmatter.tags

  // <Link to={node.fields.slug}>

  return (
    <div className={`thumbnail ${TARGET_CLASS}`}>
      <div key={node.fields.slug}>
        {thumbnailImage && (
          <Link to={node.fields.slug}>
            <GatsbyImage
              image={thumbnailImage}
              alt={`thumbnail ${node.frontmatter.title}`}
              style={{
                borderRadius: '10px',
              }}
              className="thumbnail-image"
            />
          </Link>
        )}

        <ul className="tags">
          {tags &&
            tags.map(tag => (
              <Link
                as="li"
                className="tags__item"
                to={`/tags/${tag}`}
                key={tag}
              >
                #{tag}
              </Link>
            ))}
        </ul>

        <Link to={node.fields.slug}>
          <h3 className="thumbnail-item__title">
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
        </Link>
      </div>
    </div>
  )
}
