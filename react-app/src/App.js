
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Template Parts For Header And Footer
import Header from './components/Header';
import Footer from './components/Footer';

//Template Parts For Pages
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import Pricing from './components/Pricing';
import FAQs from './components/FAQs';

function App() {
  return (
    <> 
      <Router>
        <Header></Header>
          <Routes>
            <Route path='/' element={<Home  heading="Home"/>}></Route>
            <Route path='/about' element={<About heading="About"/>}></Route>
            <Route path='/contact' element={<Contact heading="Contact"/>}></Route>
            <Route path='/features' element={<Features heading="Features"/>}></Route>
            <Route path='/pricing' element={<Pricing heading="Pricing"/>}></Route>
            <Route path='/faqs' element={<FAQs heading="FAQs"/>}></Route>
          </Routes>
        <Footer></Footer>
      </Router>
    </>    
  );
}

export default App;
