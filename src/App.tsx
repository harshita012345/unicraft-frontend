import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CompanyList from './pages/Company';
import AddEditCompany from './pages/Company/AddEditCompany';
import './app.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/add" element={<AddEditCompany />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;