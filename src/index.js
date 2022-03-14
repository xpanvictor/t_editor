
require('file-loader?name=[name].[ext]!./index.html')
import React from 'react'
import ReactDOM from 'react-dom'
import './sass/main.scss'
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './app'

function Editor() {
  return (
    <main className="tEditor_home container">
        <App />
    </main>
  )
}

const editor_home = document.getElementById('editor_home')
ReactDOM.render(<Editor />, editor_home)
