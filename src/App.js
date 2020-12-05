import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu/Menu';
import routes from './routes';

const showContentMenu = (routes) => {
  var result = null;
  if (routes.length > 0) {
    result = routes.map((route, index) => {
      return (<Route
        key={index}
        path={route.path}
        exact={route.exact}
        component={route.main}
      />);
    });
  }
  return <Switch>{result}</Switch>;
}
function App() {
  return (
    <Router>
      <div>
        <Menu />

        <div className="container">

          <div className="row">
            
            {showContentMenu(routes)}
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
