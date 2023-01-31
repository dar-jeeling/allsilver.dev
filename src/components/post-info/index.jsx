import React from 'react'
import { PostDate } from '../post-date'
import { CategorySingle } from '../categorySingle'

import './index.scss'

export const PostInfo = ({ category, date }) => {
  return (
    <div className="post-info">
      <CategorySingle category={category} />

      <PostDate date={date} />
    </div>
  )
}
