import React, { Fragment, memo, useMemo } from 'react'
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({ html: true, linkify: true })

function b64_to_utf8(str) {
  return decodeURIComponent(escape(atob(str)))
}

export default memo(function MarkdownRender({ content, isBase64 }) {
  const markdown = isBase64 ? b64_to_utf8(content) : content
  const html = useMemo(()=>md.render(markdown),[markdown]) 
  return (
    <Fragment>
      <div className='markdown-body'>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </div>

      <style jsx>{`
        @import '../static/github-markdown.css';
      `}</style>
    </Fragment>
  )
})
