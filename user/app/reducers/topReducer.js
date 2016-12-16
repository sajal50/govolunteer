import {combineReducers} from 'redux';
import userInfo from './userinfo/userInfo.js';
import notifConfig from './notifConfig/notifConfig.js';
import flags from './flags/flags.js';
import categories from './categories/categories.js';
import locations from './locations/locations.js';
import org from './org/org.js';
import user from './user/user.js';

export default combineReducers({

	userInfo,
	notifConfig,
	flags,
	categories,
	locations,
	org,
	user
});


