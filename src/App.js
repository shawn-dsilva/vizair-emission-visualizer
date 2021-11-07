import './App.css';
import Map from './components/map';
import Sidebar from './components/sidebar';
import ErrorBoundary from './components/sidebar/ErrorBoundary';

function App() {

  const Navbar = () => {
    return <div className='navbar'> VizAir - Emission Visualizer </div>
  }

  return (
    <div className="App">
      <Navbar/>
      <div style={{display:'flex', marginLeft:'1.5rem'}}>
      <ErrorBoundary>
      <Sidebar />
      </ErrorBoundary>
      <Map/>
      </div>
    </div>
  );
}

export default App;
