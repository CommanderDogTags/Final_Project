import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import All from './pages/All';
import One from './pages/One';
import Compose from './pages/Compose';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Results from './pages/Results';
import EditAvatar from './pages/EditAvatar';
import EditPhoto from './pages/EditPhoto';

const App: React.FC<IAppProps> = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/all" component={All} />
				<Route exact path="/one/:photo_id" component={One} />
				<Route exact path="/compose" component={Compose} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/results" component={Results} />
				<Route exact path="/editavatar" component={EditAvatar} />
				<Route exact path="/editphoto/:photo_id" component={EditPhoto} />
			</Switch>
		</Router>
	);
}

export interface IAppProps {}

export interface IAppState {}

export default App;
