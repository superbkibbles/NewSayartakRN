/* 
 * combines all th existing reducers
 */
import * as presistReducer from './presistReducer';
import * as generalReducer from './generalReducer';
import * as loadingReducer from './loadingReducer';
import * as appSettingsReducer from './appSettingsReducer';



export default Object.assign(presistReducer, generalReducer,loadingReducer,appSettingsReducer);
