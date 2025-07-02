import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import CompanyList from './pages/Company';
import AddEditCompany from './pages/Company/AddEditCompany';
import './app.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/add" element={<AddEditCompany />} />
        </Routes>
        <ToastContainer position='top-right' theme='colored' autoClose={2000} />
      </Layout>
    </Router>
  );
}

export default App;