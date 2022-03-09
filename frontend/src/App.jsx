import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import ForgotPassword from './pages/ForgotPassword'
import NewPassword from './pages/NewPassword'
import ConfirmAccount from './pages/ConfirmAccount'
import NewProject from './pages/NewProject'
import Project from './pages/Project'
import NewCollab from './pages/NewCollab'

// projetcs
import PrivateRoute from "./layouts/PrivateRoute"
import Projects from './pages/Projects'

import { AuthProvider } from './context/AuthProvider'
import { ProjectProvider } from './context/ProjectProvider'
import EditProjetc from './pages/EditProjetc'
import Home from "./pages/Home"
import Nav from "./components/Nav"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectProvider>
          {/* {<Nav />} */}
          <Routes>
            
            <Route path="/" element={<AuthLayout />} >
              <Route index element={<SignIn />} />
              <Route path="register" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:token" element={<ConfirmAccount />} />
            </Route>

            <Route path='/projects' element={<PrivateRoute />}>
              <Route index element={<Projects />} />
              <Route path='newproject' element={<NewProject />} />
              <Route path='newcollaborator/:id' element={<NewCollab />} />
              <Route path=':id' element={<Project />} />
              <Route path='edit/:id' element={<EditProjetc />} />
            </Route>
          </Routes>
        </ProjectProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
