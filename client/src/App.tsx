import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { UserProvider } from "./store/userContext";
import ManageUsers from "./pages/ManageUsers";
function App() {
  return (
    <UserProvider>
      <div>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/users' element={<ManageUsers />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
