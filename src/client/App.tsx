import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import All from './pages/All';
import Compose from './pages/Compose';
import Search from './pages/Search';
import Profile from './pages/Profile';
import EditAvatar from './pages/EditAvatar';
import EditPhoto from './pages/EditPhoto';
import One from './pages/One';

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
				<Route exact path="/editavatar" component={EditAvatar} />
				<Route exact path="/editphoto/:photo_id" component={EditPhoto} />
				<Route exact path="/one/:photo_id" component={One} />
			</Switch>
		</Router>
	);
}

export interface IAppProps {}

export interface IAppState {}

export default App;
