import React from "react";
import { Questions, QuizScreen, Results } from "../../screens";
import { observer } from "mobx-react-lite";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const PrivateNavigation: React.FC = observer(() => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="QiuzScreen" component={QuizScreen} />
      <Stack.Screen name="Questions" component={Questions} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
});

export default PrivateNavigation;
