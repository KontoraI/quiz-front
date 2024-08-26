import { observer } from "mobx-react-lite";
import React from "react";
import { CodeScreen, MailScreen } from "../../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const PublicNavigation: React.FC = observer(() => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MailScreen" component={MailScreen} />
      <Stack.Screen name="CodeScreen" component={CodeScreen} />
    </Stack.Navigator>
  );
});

export default PublicNavigation;
