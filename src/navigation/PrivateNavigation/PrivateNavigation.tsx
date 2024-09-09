import React from "react";
import {
  Information,
  Profile,
  Questions,
  QuizScreen,
  Results,
} from "../../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const PrivateNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="Questions" component={Questions} />
      <Stack.Screen name="Results" component={Results} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Information" component={Information} />
    </Stack.Navigator>
  );
};

export default PrivateNavigation;
