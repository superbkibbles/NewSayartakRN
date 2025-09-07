import { Component } from 'react';
import NavigationStack from './NavigationStack';
import { View } from 'react-native';

class AppNavigator extends Component {
  render() {
    return (
      <View>
        <NavigationStack />
      </View>
    );
  }
}

export default AppNavigator;
