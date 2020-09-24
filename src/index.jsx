import * as $ from 'jquery'
import Post from '@models/Post'
import json from '@/assets/json'
import Wacko from '@/assets/png'
import './styles/styles.css'
import './styles/scss.scss'
import './babel'
import React from 'react'
import {render} from 'react-dom'

const post = new Post('Webpack Post Title', Wacko)

//$('pre').addClass('code').html(post.toString());

const App = ( ) => (
  <div className="container">
    <h1>Webpack Course</h1>
    <hr/>
      <div className="logo"/>
      <hr/>
      <pre/>
      <hr/>
      <div className="card">
        <h2>SCSS</h2>
      </div>
  </div>
)

console.log( typeof document.getElementById('app'))

render((<App />), document.getElementById('app'))

console.log(post.toString(), 'Post to string');

console.log('JSON:',json)