import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import All from './pages/All';
import Compose from './pages/Compose';
import Search from './pages/Search';
import Profile from './pages/Profile';

const App: React.FC<IAppProps> = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/all" component={All} />
				<Route exact path="/compose" component={Compose} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/profile" component={Profile} />
			</Switch>
		</Router>
	);
}

export interface IAppProps {}

export interface IAppState {}

export default App;
