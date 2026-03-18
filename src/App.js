import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage } from './components/home/HomePage';
import { SignUpPage } from './components/signup/SignUpPage';
import { LoginPage } from './components/login/LoginPage';
import { ExplorePage } from './components/explore/ExplorePage';
import { ProfilePage } from './components/profile/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;