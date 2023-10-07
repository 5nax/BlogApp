import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ArticlePreview = ({ article }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`article-preview ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2>{article?.title ?? 'Untitled Article'}</h2>
      {isHovered && (
        <>
          <img
            src={`http://localhost:5000/${article.image_path}`}
            alt={article.title}
            style={{
              width: '100px',
              height: '100px',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            onError={(e) => {
              e.target.onerror = null
              e.target.src = 'path/to/default/image'
            }}
          />
          <div
            dangerouslySetInnerHTML={{
              __html: (article?.content ?? '').substring(0, 100),
            }}
          />
          <Link to={`/article/${article?.id ?? ''}`}>Read More</Link>
        </>
      )}
    </div>
  )
}

export default ArticlePreview
