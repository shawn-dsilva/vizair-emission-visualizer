import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar';
import ErrorBoundary from './components/sidebar/ErrorBoundary';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
      <Sidebar />
      </ErrorBoundary>
      <Map/>
    </div>
  );
}

export default App;
