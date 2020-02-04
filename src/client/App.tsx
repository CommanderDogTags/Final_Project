import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/login_registration_pages/Home';
import Register from './pages/login_registration_pages/Register';
import All from './pages/photo_pages/All';
import One from './pages/photo_pages/One';
import Compose from './pages/photo_pages/Compose';
import Profile from './pages/profile_pages/Profile';
import Search from './pages/search_pages/Search';
import Results from './pages/search_pages/Results';
import EditAvatar from './pages/profile_pages/EditAvatar';
import EditPhoto from './pages/profile_pages/EditPhoto';
import MyPlants from './pages/plants_pages/MyPlants';
import PlantResults from './pages/plants_pages/PlantResults';
import PlantInfo from './pages/plants_pages/PlantInfo';
import LikedPhotos from './pages/photo_pages/LikedPhotos';

const App: React.FC<IAppProps> = props => {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/all" component={All} />
				<Route exact path="/one/:photo_id" component={One} />
				<Route exact path="/compose" component={Compose} />
				<Route exact path="/likedphotos" component={LikedPhotos} />
				<Route exact path="/search" component={Search} />
				<Route exact path="/results" component={Results} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/editavatar" component={EditAvatar} />
				<Route exact path="/editphoto/:photo_id" component={EditPhoto} />
				<Route exact path="/myplants" component={MyPlants} />
				<Route exact path="/plantresults" component={PlantResults} />
				<Route exact path="/plantinfo/:trefle_id" component={PlantInfo} />
			</Switch>
		</Router>
	);
}

export interface IAppProps {}

export interface IAppState {}

export default App;
