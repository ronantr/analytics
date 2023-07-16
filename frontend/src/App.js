import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthForm from './pages/AuthForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<AuthForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App