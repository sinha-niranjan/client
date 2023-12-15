import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import FooterMenu from "../components/Menus/FooterMenu";
import axios from "axios";

const Account = () => {
  const [state, setState] = useContext(AuthContext);
  const { user } = state;

  // local state
  const [name, setName] = useState(user?.name);
  const [password, setPassword] = useState(user?.password);
  const [email] = useState(user?.email);
  const [loading, setLoading] = useState(false);

  // handle update user data
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/auth/update-user", {
        name,
        email,
        password,
      });
      setLoading(false);
      let UD = JSON.stringify(data);
      setState({ ...state, user: UD?.updatedUser });
      alert(data?.message);
    } catch (error) {
      alert(error.response.data.message);
      setLoading(false), console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToK_-LT9HmxfBNTsC0A8wfvjtfxKh3GjexbQ&usqp=CAU",
            }}
            style={{ height: 200, width: 200, borderRadius: 100 }}
          />
        </View>
        <Text style={styles.warningtext}>
          Currently you can only update your name
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Name </Text>
          <TextInput
            style={styles.inputBox}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Email </Text>
          <TextInput style={styles.inputBox} value={email} editable={false} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Password </Text>
          <TextInput
            style={styles.inputBox}
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputText}>Role </Text>
          <TextInput
            style={styles.inputBox}
            value={state?.user.role}
            editable={false}
          />
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
            <Text style={styles.updateBtnText}>
              {loading ? "Please wait.. " : "Update Profile"}{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    // margin: 10,
    justifyContent: "space-between",
    // marginTop: 40,
  },
  warningtext: {
    color: "red",
    fontSize: 13,
    textAlign: "center",
  },
  inputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  inputText: {
    fontWeight: "bold",
    width: 80,
    color: "gray",
  },
  inputBox: {
    width: 250,
    backgroundColor: "#ffffff",
    marginLeft: 10,
    fontSize: 16,
    padding: 5,
    borderRadius: 5,
  },
  updateBtn: {
    backgroundColor: "black",
    height: 50,
    width: 200,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  updateBtnText: {
    color: "#ffffff",
    fontSize: 18,
  },
});

export default Account;
