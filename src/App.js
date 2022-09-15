import React,{Component} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

class App extends Component {
  apikey=process.env.REACT_APP_API_KEY
  state ={
    progress:0
  }
  setProgress=(progress)=>
  {
    this.setState({progress:progress})
  }
  render() {
    return (<>

<BrowserRouter>
<Navbar/>
<LoadingBar
        color='#f11946'
        progress={this.state.progress}
        
      />
    <Routes>
      
      <Route path="/" element={<News setProgress={this.setProgress} key="home" page_size={20} country={"in"} category={"general"} apikey={this.apikey}/>}/>
      <Route path="/business" element={<News setProgress={this.setProgress} key="business" page_size={20} country={"in"} category={"business"} apikey={this.apikey}/>}/>
      <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" page_size={20} country={"in"} category={"entertainment"} apikey={this.apikey}/>}/>
      <Route path="/general" element={<News setProgress={this.setProgress} key="general" page_size={20} country={"in"} category={"general"} apikey={this.apikey}/>}/>
      <Route path="/health" element={<News setProgress={this.setProgress} key="health" page_size={20} country={"in"} category={"health"} apikey={this.apikey}/>}/>
      <Route path="/science" element={<News setProgress={this.setProgress} key="science" page_size={20} country={"in"} category={"science"} apikey={this.apikey}/>}/>
      <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" page_size={20} country={"in"} category={"sports"} apikey={this.apikey}/>}/>
      <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" page_size={20} country={"in"} category={"technology"} apikey={this.apikey}/>}/>
      </Routes>
      </BrowserRouter>
    </>);
  }
}

export default App;
