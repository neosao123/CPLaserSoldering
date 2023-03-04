import React from 'react'
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppFooter from "./AppFooter"

export default function Layout({children}) {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <div className="body flex-grow-1 px-3">
           {
            children
           }
        </div>
        <AppFooter />
      </div>
    </div>
  )
}
