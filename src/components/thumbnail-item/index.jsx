import React from 'react'
import { Link } from 'gatsby'
import { TARGET_CLASS } from '../../utils/visible'
import dayjs from 'dayjs'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Tags } from '../tags'
import './index.scss'
import { CategorySingle } from '../categorySingle'
import { PostDate } from '../post-date'

export const ThumbnailItem = ({ node }) => {
  const date = new dayjs(node.frontmatter.date).format('YY년 MM월 DD일')
  const thumbnailImage = getImage(node.frontmatter.thumbnail)
  const tags = node.frontmatter.tags

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

        <Tags tags={tags} />

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
            <div className="list-category">
              <CategorySingle category={node.frontmatter.category} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
