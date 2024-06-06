import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import { UserProvider } from "./store/userContext";
import ManageUsers from "./pages/ManageUsers";
import Collections from "./pages/Collections";
import MyCollections from "./pages/MyCollections";
import Collection from "./pages/Collection";
function App() {
  return (
    <UserProvider>
      <div className="w-screen h-screen">
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/users' element={<ManageUsers />} />
          <Route path='/my-collections/:userId' element={<MyCollections />} />
          <Route path='/collection/:collectionId' element={<Collection />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
