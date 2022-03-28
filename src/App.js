import './App.css';

import React from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const pageSize = 9;
  const apiKey = "b7d77c5cac7d414ba0ac7c209be86f02";

  return (
    <Router>
      <Navbar/>
      <div className="container mt-2">
        <Switch>  
          <Route exact path="/"><News key="general" apiKey={apiKey} pageSize={pageSize} country="in" category="general"/></Route>
          <Route exact path="/business"><News key="business" apiKey={apiKey} pageSize={pageSize} country="in" category="business"/></Route> 
          <Route exact path="/entertainment"><News key="entertainment" apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment"/></Route> 
          <Route exact path="/general"><News key="general" apiKey={apiKey} pageSize={pageSize} country="in" category="general"/></Route> 
          <Route exact path="/health"><News key="health" apiKey={apiKey} pageSize={pageSize} country="in" category="health"/></Route> 
          <Route exact path="/science"><News key="science" apiKey={apiKey} pageSize={pageSize} country="in" category="science"/></Route> 
          <Route exact path="/sports"><News key="sports" apiKey={apiKey} pageSize={pageSize} country="in" category="sports"/></Route> 
          <Route exact path="/technology"><News key="technology" apiKey={apiKey} pageSize={pageSize} country="in" category="technology"/></Route> 
        </Switch>
      </div>
    </Router>
  )
}

export default App;




// method 1 ---> first -> npm uninstall react-router-dom and then --> npm install react-router-dom@5.2.0
// Just Use Routes instead of "Switch" for version 6

// key --> key is different for each category and 
// is used so that when we click on any category then it will show that specific category news

// exact --> so that path exactly match then open that category