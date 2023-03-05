import { graphql } from 'gatsby'
import _ from 'lodash'
import React, { useRef, useEffect, useMemo, useState, useCallback } from 'react'

import { Head } from '../../components/head'
import { Tags } from '../../components/tags'
import { HOME_TITLE } from '../../constants'

import { Layout } from '../../layout'
import * as Dom from '../../utils/dom'
import Tag from './[tag]'

export default ({ data, location }) => {
  const { siteMetadata } = data.site
  const { countOfInitialPost } = siteMetadata.configs
  const posts = data.allMarkdownRemark.edges

  const tags = useMemo(
    () => _.uniq(posts.map(({ node }) => node.frontmatter.category)),
    []
  )

  console.log(tags)

  const countTagPost = useCallback(() => {
    const tagMap = new Map()
    tagMap.set('ALL', posts.length)

    posts.map(({ node }) => {
      const currentCategory = node.frontmatter.category

      if (!tagMap.has(currentCategory)) {
        tagMap.set(currentCategory, 1)
      } else {
        const currentCount = tagMap.get(currentCategory)
        tagMap.set(currentCategory, currentCount + 1)
      }
    })

    return tagMap
  })

  const tagCount = countTagPost()

  console.log(tagCount)

  return (
    <Layout location={location} title={siteMetadata.title}>
      <Head title={HOME_TITLE} keywords={siteMetadata.keywords} />

      <Tags tags={tags} />
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
