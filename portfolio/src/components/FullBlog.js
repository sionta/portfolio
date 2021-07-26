import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import parse from 'html-react-parser';

function FullBlog() {

  const initialState = {
    isLoading: false,
    blogs: null
  }

  async function fetchBlogs() {
    const res = await axios.get('http://localhost:9000/.netlify/functions/blogPosts')
    dispatch({
      type: "blogFetched",
      payload: res.data
    })
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "blogLoading":
        return {
          ...state,
          isLoading: true
        };
      case "blogFetched":
        return {
          ...state,
          isLoading: false,
          blogs: action.payload
        };
      case "blogFetchFail":
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        return {
          ...state,
          isLoading: false,
          error: "unknown error"
        };
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function load() {

      dispatch({
        type: "blogLoading"
      })
      
      fetchBlogs()
    }

    load()
  }, [])

  if (!state.isLoading && state.blogs !== null) {
    let blogList = state.blogs.data.map((blog) => {
      let blogBody = parse(blog.body_html)
      return (
        <li key={blog.id} className="blog">
          <h2>{blog.title}</h2>
          {blogBody}
        </li>
      )
    })

    return (
      <section className="full-blog">
        <ul>
          {blogList}
        </ul>
      </section>
  )
  } else {
    return (
      <p>Blogs loading!</p>
    )
  }
}

export default FullBlog;