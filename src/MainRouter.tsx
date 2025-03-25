import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

type Props = {}

const MainRouter = (props: Props) => {
  return (
    <div>
    <div className="main-container">
        <HashRouter>
            
            <div className="content-container">
                <Routes>
                    {/* <Route path="/" element={<MainPage />} /> */}
                    
                </Routes>
            </div>
           
        </HashRouter>
    </div>
</div>
  )
}

export default MainRouter