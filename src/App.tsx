import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home'
import PageNotFound from './components/PageNotFound'
import Gallery from './components/gallery/Gallery'
import Login from './components/Login'
import { AuthProvider, RequireAuth } from './Auth/auth';

function App() {

  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              <RequireAuth>
                <Home/>
              </RequireAuth>
            } 
          />
          <Route 
            path="/gallery" 
            element={
              <RequireAuth>
                <Gallery/>
              </RequireAuth>
            } 
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/*" element={<PageNotFound/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
  
}

export default App;
