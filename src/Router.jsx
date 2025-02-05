import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppHome from './layout/AppHome'
import Login from './components/auth/Login'
import Home from './views/Home'
import CaretakerProfile from './views/CaretakerProfile'
import About from './views/About'
import OwnerRegisterViews from './views/OwnerRegisterViews'
import SearchResults from './views/SearchResults'
import CaretakerRegisterViews from './views/CaretakerRegisterViews'
import ProfileView from './views/ProfileView'
import UserLayout from './layout/UserLayout'
import NewPet from './components/ui/NewPet'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppHome />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/auth/register/owner/:id" element={<OwnerRegisterViews />} />
          <Route path="/auth/register/caretaker/:id" element={<CaretakerRegisterViews />} />
        </Route>
        <Route element={<UserLayout />}>
          <Route path="/profile" element={<ProfileView/>} />
          <Route path={"/caretaker/:id"} element={<CaretakerProfile />} />
          <Route path="/results" element={<SearchResults />} />
          <Route path="/user/:id/newpet" element={<NewPet />} />
        </Route>
      </Routes>
    </BrowserRouter >
  )
}

