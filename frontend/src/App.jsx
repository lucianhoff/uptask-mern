import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />} >
          <Route index element={<SignIn />} />
          <Route path="register" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/:token" element={<NewPassword />} />
          <Route path="confirm-account/:token" element={<ConfirmAccount />} />
        </Route>

        <Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
