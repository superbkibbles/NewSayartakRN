import * as React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NavigationService from './NavigationService';
import { strings } from '../Local/i18n';
import { Text } from 'react-native-svg';
// import Splash from '../screens/Splash';
// import Home from '../screens/Home';
// import { TabBottomComponent } from '../components/index';
// import Brands from '../screens/Brands';
// import CarDetails from '../screens/CarDetails';
// import Account from '../screens/Account';
// import Search from '../screens/Search';
// import FilterBrands from '../screens/FilterBrands';
// import MyAds from '../screens/MyAds';
// import FavoriteCars from '../screens/FavoriteCars';
// import ResultSearch from '../screens/ResultSearch';
// import ShowRooms from '../screens/ShowRooms';
// import FavoriteGalleries from '../screens/FavoriteGalleries';
// import ShowRoomsDetails from '../screens/ShowRoomsDetails';
// import AboutUs from '../screens/AboutUs';
// import PrivacyPolicy from '../screens/PrivacyPolicy';
// import TermsAndConditions from '../screens/TermsAndConditions';
// import ASQ from '../screens/ASQ';
// import ContactUs from '../screens/ContactUs';
// import Settings from '../screens/Settings';
// import Notification from '../screens/Notification';
// import AddCar from '../screens/AddCar';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
// import ThanksYou from '../screens/ThanksYou';
// import FilterModals from '../screens/FilterModals';
// import FilterCities from '../screens/FilterCities';

// import FilterEngineCapacity from '../screens/FilterEngineCapacity';
// import FilterSpecifications from '../screens/FilterSpecifications';
// import FilterFuelTypes from '../screens/FilterFuelTypes';
// import ForceUpdateApp from '../screens/ForceUpdateApp';
// import NetworkError from '../screens/NetworkError';

// import FilterGearboxs from '../screens/FilterGearboxs';
// import SignIn from '../screens/SignIn';
// import SignUp from '../screens/SignUp';
// import VerifiyPhone from '../screens/VerifiyPhone';
// import ForgotPassword from '../screens/ForgotPassword';
// import EditProfile from '../screens/EditProfile';
// import ResetPassword from '../screens/ResetPassword';
// import EditCar from '../screens/EditCar';
// import SocailLoginPhone from '../screens/SocailLoginPhone/index';

export type Navigators = 'Splash';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const StackSharedElement = createSharedElementStackNavigator();

// function HomeStack() {
//   return (
//     <StackSharedElement.Navigator initialRouteName="Home" headerMode="none">
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="Home"
//         component={Home}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="Brands"
//         component={Brands}
//       />
//       <StackSharedElement.Screen
//         options={{
//           cardStyle: { backgroundColor: 'transparent' },
//           cardStyleInterpolator: ({ current: { progress } }) => {
//             return { cardStyle: { opacity: progress } };
//           },
//         }}
//         name="CarDetails"
//         component={CarDetails}

//         // sharedElementsConfig={(route, otherRoute, showing) => {
//         //     const { item } = route.params;
//         //     return [`item.${item.id}.photo`];
//         // }}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="EditCar"
//         component={EditCar}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="ResultSearch"
//         component={ResultSearch}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="Notification"
//         component={Notification}
//       />

//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="FilterBrands"
//         component={FilterBrands}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="FilterModals"
//         component={FilterModals}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="FilterCities"
//         component={FilterCities}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="FilterEngineCapacity"
//         component={FilterEngineCapacity}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="FilterGearboxs"
//         component={FilterGearboxs}
//       />

//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="FilterSpecifications"
//         component={FilterSpecifications}
//       />
//       <StackSharedElement.Screen
//         options={{ animationEnabled: true }}
//         name="FilterFuelTypes"
//         component={FilterFuelTypes}
//       />
//     </StackSharedElement.Navigator>
//   );
// }

const DummyScreen = () => {
  return (
    <View>
      <Text>Dummy Screen</Text>
    </View>
  );
};

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="AddCar" headerMode="none">
      {/* <Stack.Screen
          options={{ animationEnabled: true }}
          name="FilterBrands"
          component={FilterBrands}
        />
        <Stack.Screen
          options={{ animationEnabled: true }}
          name="FilterModals"
          component={FilterModals}
        />
        <Stack.Screen
          options={{ animationEnabled: true }}
          name="FilterCities"
          component={FilterCities}
        />
        <Stack.Screen
          options={{ animationEnabled: true }}
          name="FilterEngineCapacity"
          component={FilterEngineCapacity}
        />
        <Stack.Screen
          options={{ animationEnabled: true }}
          name="FilterGearboxs"
          component={FilterGearboxs}
        />
  
        <Stack.Screen
          options={{ animationEnabled: true }}
          name="FilterSpecifications"
          component={FilterSpecifications}
        />
        <Stack.Screen
          options={{ animationEnabled: true }}
          name="FilterFuelTypes"
          component={FilterFuelTypes}
        />
        <Stack.Screen
          options={{ animationEnabled: true }}
          name="AddCar"
          component={AddCar}
        /> */}
      <Stack.Screen name="AddCar" component={DummyScreen} />
    </Stack.Navigator>
  );
}

function AddCarStack() {
  return (
    <Stack.Navigator initialRouteName="AddCar" headerMode="none">
      {/* <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterBrands"
        component={FilterBrands}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterModals"
        component={FilterModals}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterCities"
        component={FilterCities}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterEngineCapacity"
        component={FilterEngineCapacity}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterGearboxs"
        component={FilterGearboxs}
      />

      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterSpecifications"
        component={FilterSpecifications}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterFuelTypes"
        component={FilterFuelTypes}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="AddCar"
        component={AddCar}
      /> */}
      <Stack.Screen name="AddCar" component={DummyScreen} />
    </Stack.Navigator>
  );
}

function GalleriesStack() {
  return (
    <Stack.Navigator initialRouteName="ShowRooms" headerMode="none">
      {/* <Stack.Screen
        options={{ animationEnabled: true }}
        name="ShowRooms"
        component={ShowRooms}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="ShowRoomsDetails"
        component={ShowRoomsDetails}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="CarDetails"
        component={CarDetails}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="Notification"
        component={Notification}
      /> */}
      <Stack.Screen name="ShowRooms" component={DummyScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator initialRouteName="OurFleet" headerMode="none">
      {/* <Stack.Screen
        options={{ animationEnabled: true }}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterBrands"
        component={FilterBrands}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="ResultSearch"
        component={ResultSearch}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterModals"
        component={FilterModals}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterCities"
        component={FilterCities}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterEngineCapacity"
        component={FilterEngineCapacity}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterGearboxs"
        component={FilterGearboxs}
      />

      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterSpecifications"
        component={FilterSpecifications}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterFuelTypes"
        component={FilterFuelTypes}
      />

      <Stack.Screen
        options={{ animationEnabled: true }}
        name="CarDetails"
        component={CarDetails}
      />

      <Stack.Screen
        options={{ animationEnabled: true }}
        name="Notification"
        component={Notification}
      /> */}
      <Stack.Screen name="OurFleet" component={DummyScreen} />
    </Stack.Navigator>
  );
}

function AccountStack() {
  return (
    <Stack.Navigator initialRouteName="Account" headerMode="none">
      {/* <Stack.Screen
        options={{ animationEnabled: true }}
        name="Account"
        component={Account}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="MyAds"
        component={MyAds}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FavoriteCars"
        component={FavoriteCars}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="ShowRoomsDetails"
        component={ShowRoomsDetails}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FilterCities"
        component={FilterCities}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="CarDetails"
        component={CarDetails}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="FavoriteGalleries"
        component={FavoriteGalleries}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="AboutUs"
        component={AboutUs}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="TermsAndConditions"
        component={TermsAndConditions}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="ASQ"
        component={ASQ}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="ContactUs"
        component={ContactUs}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="Settings"
        component={Settings}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="Notification"
        component={Notification}
      />
      <Stack.Screen
        options={{ animationEnabled: true }}
        name="EditProfile"
        component={EditProfile}
      /> */}
      <Stack.Screen name="Account" component={DummyScreen} />
    </Stack.Navigator>
  );
}

function Tabs() {
  return (
    <Tab.Navigator
    // tabBar={props => <TabBottomComponent {...props} />}
    >
      <Tab.Screen
        initialParams={{ name: strings('home') }}
        name="racing"
        component={HomeStack}
      />
      <Tab.Screen
        initialParams={{ name: strings('search') }}
        name="search"
        component={SearchStack}
      />
      <Tab.Screen
        initialParams={{ name: strings('add') }}
        name="add"
        component={AddCarStack}
      />
      <Tab.Screen
        initialParams={{ name: strings('gallery') }}
        name="shop"
        component={GalleriesStack}
      />
      <Tab.Screen
        initialParams={{ name: strings('account') }}
        name="user"
        component={AccountStack}
      />
    </Tab.Navigator>
  );
}

export default function RNApp() {
  return (
    <View style={{ width: '100%', height: '100%' }}>
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      >
        <Stack.Navigator
          // mode={"modal"}
          initialRouteName="Splash"
          headerMode="none"
        >
          {/* <Stack.Screen
            options={{ animationEnabled: true }}
            name="Splash"
            component={Splash}
          />

          <Stack.Screen
            options={{ animationEnabled: true }}
            name="SignIn"
            component={SignIn}
          />
          <Stack.Screen
            options={{ animationEnabled: true }}
            name="SocailLoginPhone"
            component={SocailLoginPhone}
          />
          <Stack.Screen
            options={{ animationEnabled: true }}
            name="SignUp"
            component={SignUp}
          />
          <Stack.Screen
            options={{ animationEnabled: true }}
            name="VerifiyPhone"
            component={VerifiyPhone}
          />
          <Stack.Screen
            options={{ animationEnabled: true }}
            name="ResetPassword"
            component={ResetPassword}
          /> */}

          <Stack.Screen
            options={{ animationEnabled: true }}
            name="Tabs"
            component={Tabs}
          />
          {/* <Stack.Screen
            options={{ animationEnabled: true }}
            name="ThanksYou"
            component={ThanksYou}
          /> */}
          {/* <Stack.Screen
            options={{ animationEnabled: true }}
            name="ForgotPassword"
            component={ForgotPassword}
          /> */}
          {/* <Stack.Screen
            options={{ animationEnabled: true }}
            name="ForceUpdateApp"
            component={ForceUpdateApp}
          />
          <Stack.Screen
            options={{ animationEnabled: true }}
            name="NetworkError"
            component={NetworkError}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}
