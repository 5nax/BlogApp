import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'
import '../style/article.css'

function Article() {
  const [article, setArticle] = useState(null)
  const [editorContent, setEditorContent] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/articles/${id}`)
        setArticle(response.data)
      } catch (err) {
        console.error('Error fetching the article', err)
      }
    }
    fetchArticle()
  }, [id])

  return (
    <div className="article">
      {article ? (
        <>
          <h1>{article.title}</h1>

          <div
            dangerouslySetInnerHTML={{
              __html: article.content.slice(
                0,
                Math.floor(article.content.length / 2),
              ),
            }}
          />

          <img
            src={`http://localhost:5000/${article.image_path}`}
            alt={article.title}
          />

          <div dangerouslySetInnerHTML={{ __html: article.content }} />

          <div
            dangerouslySetInnerHTML={{
              __html: article.embeddedCode,
            }}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}
export default Article
