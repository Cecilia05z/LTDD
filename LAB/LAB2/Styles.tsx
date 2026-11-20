import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  input: {
    margin: 15,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },

  submit: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    
  },

  submitText: {
    color: "white",
    textAlign: "center",
  },
});