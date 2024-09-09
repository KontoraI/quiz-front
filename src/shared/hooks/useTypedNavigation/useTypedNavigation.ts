import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const useTypedNavigation = () => useNavigation<NavigationProp>();

export default useTypedNavigation;
