// Components
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import { useStateValue } from './components/StateProvider/StateProvider';
// Styles
import './scss/styles.scss';
// React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [{ user }, dispatch] = useStateValue();
  
  return (
    <div className="App">
      {/* React-Router --> Chat Screen */}
      <Router>
        {!user ? (
        <Login/>
        ) : (
          <>
          {/* Header */}
            <Header />
            <div className="app-body">
              <Sidebar />
              {/* Sidebar */}
              <Routes>
                <Route exact path="/room" element={<Chat/>}/>
                <Route path="/:roomId" element={<Chat/>}/>
                {/* <Route path="/" /> */}
              </Routes>
              {/* Route checks the route you're in and renders the appropriate screen */}
            </div>
          </>
        )}
      </Router>
      {/* Wrap everything you want as default inside the router */}
    </div>
  );
} 

export default App;

// The react router will show the correct chat screen and switch channels without refreshing