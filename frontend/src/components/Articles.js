import React from 'react'
import ArticlePreview from './ArticlePreview'
function Articles({ articles }) {
  console.log(articles)
  return (
    <div className="articles-list">
      {articles ? (
        articles.map((article, index) => (
          <ArticlePreview key={`${article.id}-${index}`} article={article} />
        ))
      ) : (
        <p>No articles available</p>
      )}
    </div>
  )
}

export default Articles
