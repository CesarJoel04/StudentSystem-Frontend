import './App.css';
import Appbar from './components/Appbar';
import Student from './components/Student';

function App() {
  return (
    // Main container for the application
    <div className="App">
      {/* Appbar component for the top navigation bar */}
      <Appbar />
      {/* Student component for managing student data */}
      <Student />
    </div>
  );
}

export default App;