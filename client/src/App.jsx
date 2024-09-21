import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./navigation/Navbar";
import Donation from "./Donation/Donation";
import Crisis from "./Crisis/Crisis";
import Volunteer from "./Volunteer/Volunteer";
import Management from "./Admin_Management/Management";
import SignInSignUpForm from "./Authentication/SignInSignUpForm";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login/:type" element={<SignInSignUpForm />}></Route>
          <Route path="/donation" element={<Donation />}></Route>
          <Route path="/crisis" element={<Crisis />}></Route>
          <Route path="/volunteer" element={<Volunteer />}></Route>
          <Route path="/management" element={<Management />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
