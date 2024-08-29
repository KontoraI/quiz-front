import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { authService } from "./src/shared/store/authStore";
import { PrivateNavigation, PublicNavigation } from "./src/navigation";

const App = observer((): React.JSX.Element => {
  const { isAuth } = authService;

  return (
    <NavigationContainer>
      {isAuth ? <PrivateNavigation /> : <PublicNavigation />}
    </NavigationContainer>
  );
});
export default App;
