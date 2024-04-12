import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './utils/routes'
import './App.css'
import EditDocument from './pages/EditDocument';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit" element={<EditDocument />} />
        {Object.entries(routes).map(([path, element]) => (
          <Route key={path} path={path} element={element()} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;