import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Donation from "./Donation/Donation";
import Crisis from "./Crisis/Crisis";
import Volunteer from "./Volunteer/Volunteer";
import Management from "./Admin_Management/Management";
import SignInSignUpForm from "./Authentication/SignInSignUpForm";
import { UserProvider } from "./context/UserProvider";
import SignInSignUpFormAdmin from "./Authentication/SignInSignUpFormAdmin";
import HomePage from "./Home/HomePage";
import Inventory from "./Inventory/Inventory";
function App() {
  return (
    <UserProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/login" element={<SignInSignUpForm />}></Route>
            <Route
              path="/adminLogin"
              element={<SignInSignUpFormAdmin />}
            ></Route>
            <Route path="/donation" element={<Donation />}></Route>
            <Route path="/crisis" element={<Crisis />}></Route>
            <Route path="/volunteer" element={<Volunteer />}></Route>
            <Route path="/management" element={<Management />}></Route>
            <Route path="/inventory" element={<Inventory />}></Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
