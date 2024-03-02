import { Routes, Route } from "react-router-dom"
import PreviewPage from "./Page/PreviewPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<PreviewPage />}></Route>
      </Routes>
    </>
  )
}

export default App
