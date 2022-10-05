import React,{useState} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const App=()=>{
  const apikey=process.env.REACT_APP_API_KEY
  
  const [progress, setProgress] = useState(0)
  
  
    return (<>

<BrowserRouter>
<Navbar/>
<LoadingBar
        color='#f11946'
        progress={progress}
        
      />
    <Routes>
      
      <Route path="/" element={<News setProgress={setProgress} key="home" page_size={20} country={"in"} category={"general"} apikey={apikey}/>}/>
      <Route path="/business" element={<News setProgress={setProgress} key="business" page_size={20} country={"in"} category={"business"} apikey={apikey}/>}/>
      <Route path="/entertainment" element={<News setProgress={setProgress} key="entertainment" page_size={20} country={"in"} category={"entertainment"} apikey={apikey}/>}/>
      <Route path="/general" element={<News setProgress={setProgress} key="general" page_size={20} country={"in"} category={"general"} apikey={apikey}/>}/>
      <Route path="/health" element={<News setProgress={setProgress} key="health" page_size={20} country={"in"} category={"health"} apikey={apikey}/>}/>
      <Route path="/science" element={<News setProgress={setProgress} key="science" page_size={20} country={"in"} category={"science"} apikey={apikey}/>}/>
      <Route path="/sports" element={<News setProgress={setProgress} key="sports" page_size={20} country={"in"} category={"sports"} apikey={apikey}/>}/>
      <Route path="/technology" element={<News setProgress={setProgress} key="technology" page_size={20} country={"in"} category={"technology"} apikey={apikey}/>}/>
      </Routes>
      </BrowserRouter>
    </>);
  }


export default App;
