import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { InfoIcon, ProfileIcon, QuitIcon } from "../../shared/icons";
import { userService } from "../../shared/store/userStore";
import { useTypedNavigation } from "../../shared/hooks";
import { authService } from "../../shared/store/authStore";

interface HeaderProps {
  loading: boolean;
  isSelected: { state: boolean; selectedIndex: number };
}

const Header: React.FC<HeaderProps> = ({
  loading = false,
  isSelected = { state: false, selectedIndex: 0 },
}) => {
  const { loadUser } = userService;

  const { logout } = authService;

  const navigation = useTypedNavigation();

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        disabled={loading || isSelected.state}
        onPress={() => {
          loadUser().then(() => navigation.navigate("Profile"));
        }}
      >
        <ProfileIcon />
      </TouchableOpacity>
      <View style={styles.container}>
        <TouchableOpacity
          disabled={loading || isSelected.state}
          onPress={() => navigation.navigate("Information")}
        >
          <InfoIcon />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading || isSelected.state}
          onPress={() => logout()}
        >
          <QuitIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 27.5,
    backgroundColor: "#F8FBFF",
    alignItems: "center",
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    height: 40,
    marginBottom: 5,
  },
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 25.5,
  },
});
