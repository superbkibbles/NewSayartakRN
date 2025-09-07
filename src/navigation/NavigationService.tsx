import { NavigationActions } from 'react-navigation';
import { StackActions } from '@react-navigation/native';
export let _navigator;


type ScreensProps =
    "CarDetails" |
    "AboutUs" |
    "Home" |
    "Account" |
    "ASQ" |
    "Brands" |
    "ShowRooms" |
    "ContactUs" |
    "FavoriteCars" |
    "FavoriteGalleries" |
    "FilterBrands" |
    "ShowRoomsDetails" |
    "MyAds" |
    "Notification" |
    "PrivacyPolicy" |
    "ResultSearch" |
    "Search" |
    "Settings" |
    "Splash" |
    "TermsAndConditions"
function setTopLevelNavigator(navigatorRef) {

    _navigator = navigatorRef;
}

function navigate(routeName: ScreensProps, params) {

    _navigator.navigate(routeName, params)
    // _navigator.dispatch(
    //     NavigationActions.navigate({
    //         routeName,
    //         params
    //     })
    // );
}

function replace(routeName, params) {
    // const resetAction = StackActions.reset({
    //     index: 0,
    //     actions: [NavigationActions.navigate({ routeName: routeName,params:params})],
    // });
    _navigator.dispatch(StackActions.replace(routeName, params));

}

function goBack(key) {
    _navigator.goBack()
        ;
}

// add other navigation functions that you need and export them

export default {
    navigate,
    goBack,
    replace,
    setTopLevelNavigator
};
