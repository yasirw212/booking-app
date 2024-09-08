import React from 'react'
import './Layout.css'
import Header from '../components/Header'

type Props = {}

const Layout = (props: Props) => {
  return (
    <div className="layout-container container">
        <Header />
    </div>
  )
}

export default Layout