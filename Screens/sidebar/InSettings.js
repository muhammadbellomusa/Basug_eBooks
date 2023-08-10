import { StyleSheet, Text, View, Switch } from "react-native";
import React from "react";
import { useTheme } from "@react-navigation/native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InSettings = () => {
  const { colors } = useTheme();
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("alreadyLaunched").then((value) => {
      if (value === false) {
        AsyncStorage.setItem("alreadyLaunched", "false");
        setToggle(false);
      } else {
        setToggle(true);
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.switch}>
        <Text style={{ fontSize: 17, color: colors.text }}>
          Advanced Settings
        </Text>
        <Switch
          onValueChange={(val) => {
            setToggle(val);
            // EventRegister.emit("changeThemeEvent", val);
          }}
          value={toggle}
        />
      </View>
    </View>
  );
};

export default InSettings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  switch: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginTop: 15,
  },
});
