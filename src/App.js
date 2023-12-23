import React from 'react';
import { Route,Routes } from 'react-router-dom';

import './App.css';
import Layout from './Layout';
import CreatePost from './Pages/CreatePost';
import EditorPage from './Pages/EditorPage';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import PostPage from './Pages/PostPage';
import RegisterPage from './Pages/RegisterPage';
import UserContextProvider  from './UserContext';


function App() {
  return (
  <UserContextProvider>
     <Routes>
        <Route path='/' element={<Layout />}>
          <Route index  element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/create' element={<CreatePost />} />
           <Route path='/post/:id' element={<PostPage/>} />
           <Route path='/edit/:id' element={<EditorPage />} />
        </Route>
      </Routes>
   

  </UserContextProvider>
     
  );
}

export default App;
