import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useRef, useEffect, useState, useCallback } from 'react'
import { Contents } from '../../components/contents'
import { Head } from '../../components/head'
import { HOME_TITLE } from '../../constants'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { useRenderedCount } from '../../hooks/useRenderedCount'
import { useScrollEvent } from '../../hooks/useScrollEvent'
import { Layout } from '../../layout'
import * as Dom from '../../utils/dom'
import * as EventManager from '../../utils/event-manager'
import { TagHeader } from '../../components/tagHeader'

const BASE_LINE = 80

function getDistance(currentPos) {
  return Dom.getDocumentHeight() - currentPos
}

const TAG_START = 6

export default ({ data, location }) => {
  const currentTag = decodeURI(location.pathname.slice(TAG_START))
  console.log('currentTag', currentTag)

  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges

  const [DEST, setDEST] = useState(316)
  const [count, countRef, increaseCount] = useRenderedCount()

  useIntersectionObserver()
  useScrollEvent(() => {
    const currentPos = window.scrollY + window.innerHeight
    const isTriggerPos = () => getDistance(currentPos) < BASE_LINE
    const doesNeedMore = () =>
      posts.length > countRef.current * countOfInitialPost

    return EventManager.toFit(increaseCount, {
      dismissCondition: () => !isTriggerPos(),
      triggerCondition: () => isTriggerPos() && doesNeedMore(),
    })()
  })

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />
      <TagHeader tag={currentTag} />
      <Contents
        posts={posts}
        countOfInitialPost={countOfInitialPost}
        count={count}
        tag={currentTag}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        configs {
          countOfInitialPost
        }
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { ne: null }, draft: { eq: false } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 200, truncate: true)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            thumbnail {
              childImageSharp {
                gatsbyImageData(
                  width: 1200
                  height: 500
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
            title
            category
            draft
            tags
          }
        }
      }
    }
  }
`
