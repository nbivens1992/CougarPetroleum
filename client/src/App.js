import { Routes, Route } from 'react-router-dom'

import index from './src/index.html'

function App() {
  return (
    <Routes>
        <Route path="index" element={<index />} >
        </Route>
    </Routes>
  )
}

export default App;