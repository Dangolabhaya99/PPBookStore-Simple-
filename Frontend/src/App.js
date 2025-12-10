import React from 'react';
import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import HomeComponent from './PP BookStore/Home/HomeComponent';
import Navbar from './PP BookStore/Navbar/NavComponent';
import LoginComponent from './PP BookStore/Login/LoginComponen';
import SignUpCompoenet from './PP BookStore/Signup/SignupComponent';
import AboutComponent from './PP BookStore/About/AboutComponent';
import ContactComponent from './PP BookStore/Contact/ContactComponent';
import ProfilePage from './PP BookStore/Profile/ProfileComponent';
import AddToCartPage from './PP BookStore/Cart/CartComponent';
import PublicationComponent from './PP BookStore/Publication/Publicationcomponent';
import AddBookComponent from './PP BookStore/AddBooks/AddBookComponent';
import ProtectedRoute from "./ProtectedRoutes/protectedRoute";
import ViewBooksComponent from './PP BookStore/ViewBooks/ViewBooksComponent';
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
  return (

    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
    <Router>
      <Navbar/>
    <Routes>
    <Route path='/' element={<HomeComponent/>}/>
    <Route path='/about' element={<AboutComponent/>}/>
    <Route path='/cart' element={<AddToCartPage/>}/>
    <Route path='/publication' element={<PublicationComponent/>}/>
    <Route path='/addbook' element={<AddBookComponent/>}/>
    <Route path='/viewbooks' element={<ViewBooksComponent/>}/>
    <Route path='/contact' element={<ContactComponent/>}/>
    <Route path='/profile' element={<ProfilePage/>}/>
    <Route path='/login' element={<LoginComponent/>}/>
    <Route path='/signup' element={<SignUpCompoenet/>}/>
    
              <Route 
              path="/viewbooks" 
              element={
                <ProtectedRoute>
                  <ViewBooksComponent />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/cart" 
              element={
                <ProtectedRoute>
                  <AddToCartPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/publication" 
              element={
                <ProtectedRoute role="admin">
                  <PublicationComponent />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/addbook" 
              element={
                <ProtectedRoute role="admin">
                  <AddBookComponent />
                </ProtectedRoute>
              } 
            />
    </Routes>
    </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
