import { Routes, Route } from 'react-router-dom'

import signUpForm from './signUpForm.html'

function App() {
  return (
    <Routes>
        <Route path="signUpForm" element={<signUpForm />} >
        </Route>
    </Routes>
  )
}

export default App;