import logo from './logo.svg';
import './App.css';
// import Sidebar from './components/Sidebar'
// import Content from './components/Content'
// import Graph from './components/Graph'

import ContentPackage from './components/ContentPackage'

function App() {
  return (
    <div>
    <div className="app" style={{background: "#e3ffff"}}>
        {/*
        <Sidebar />
        <Content />
        */}

        <ContentPackage />
        <div className="break"></div>
        <div>AFTER BREAK BUT INSIDE DIV CLASSNAME APP</div>
      </div>
              <div style={{background: '#ff0000', display: 'table'}}>DIV1 TESTING TESTIGN TESTING</div>
              <span style={{display: 'block'}}>DIV2</span>
      
      {/*
              <Graph />
      */}
    </div>
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

export default App;
