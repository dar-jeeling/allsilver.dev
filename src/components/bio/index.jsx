import React, { forwardRef } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import { StatusBadge } from '../statusBadge'
import './index.scss'
import { Wreath } from '../flowerProfile'

export const Bio = forwardRef((props, ref) => {
  const statuses = [
    // { type: 'writing', description: '"소통"에 대한 포스팅 작성 중' },
    // {
    //   type: 'reading',
    //   description: '"자바스크립트는 왜 그 모양일까?" 읽는 중',
    // },
    // {
    //   type: 'exam',
    //   description: '중간고사 공부 중',
    // },
    // {
    //   type: 'study',
    //   description: 'CS 면접 스터디 진행 중',
    // },
  ]

  return (
    <StaticQuery
      query={bioQuery}
      render={data => {
        const { author, social, introduction } = data.site.siteMetadata

        return (
          <div ref={ref} className="bio">
            <div className="author">
              <div className="author-description">
                <div className="author-profile">
                  <Image
                    className="author-image"
                    fixed={data.avatar.childImageSharp.fixed}
                    alt={author}
                    style={{
                      borderRadius: `100%`,
                    }}
                  />
                  <Wreath />
                </div>

                <div className="author-name">
                  <span className="author-name-prefix">Written by</span>
                  <Link to={'/about'} className="author-name-content">
                    <span>@{author}</span>
                  </Link>
                  <div className="author-introduction">{introduction}</div>

                  <div className="author-status">
                    {statuses.map((status, index) => (
                      <StatusBadge key={index} status={status} />
                    ))}
                  </div>

                  <p className="author-socials">
                    {social.instagram && (
                      <a href={`https://www.instagram.com/${social.instagram}`}>
                        Instagram
                      </a>
                    )}
                    {social.github && (
                      <a href={`https://github.com/${social.github}`}>GitHub</a>
                    )}
                    {social.medium && (
                      <a href={`https://medium.com/${social.medium}`}>Medium</a>
                    )}
                    {social.twitter && (
                      <a href={`https://twitter.com/${social.twitter}`}>
                        Twitter
                      </a>
                    )}
                    {social.facebook && (
                      <a href={`https://www.facebook.com/${social.facebook}`}>
                        Facebook
                      </a>
                    )}
                    {social.linkedin && (
                      <a
                        href={`https://www.linkedin.com/in/${social.linkedin}/`}
                      >
                        LinkedIn
                      </a>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      }}
    />
  )
})

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.jpeg/" }) {
      childImageSharp {
        fixed(width: 72, height: 72) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        introduction
        social {
          twitter
          github
          medium
          facebook
          linkedin
          instagram
        }
      }
    }
  }
`

export default Bio
