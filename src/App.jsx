import { useState } from 'react'
import './App.css'
import { WatchListContextProvider } from './context/WatchListContext'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import StockDetailedPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <main className='container'>
      <WatchListContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StockOverviewPage/>}/>
        <Route path="/detail/:symbol" element={<StockDetailedPage/>}/>
      </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </main>
  )
}

export default App
