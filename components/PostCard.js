import { View, Text, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const PostCard = ({ posts, myPostScreen }) => {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  // handle delelete prompt
  const handleDeletePrompt = (id) => {
    Alert.alert("Attention! ", "Are you sure want to delete this post ?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel Press");
        },
      },
      {
        text: "Delete",
        onPress: () => handleDeletePost(id),
      },
    ]);
  };

  // delete post data
  const handleDeletePost = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/post/delete-post/${id}`);

      setLoading(false);
      // console.log(data);
      alert(data?.message);
      navigation.navigate("Home");
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };
  return (
    <View>
      <Text style={styles.heading}>Total Posts {posts?.length}</Text>
      {posts?.map((post, i) => (
        <View style={styles.card} key={i}>
          {myPostScreen && (
            <View>
              <Text style={{ textAlign: "right" }}>
                <FontAwesome5Icon
                  name="trash"
                  size={16}
                  color={"red"}
                  onPress={() => handleDeletePrompt(post?._id)}
                />
              </Text>
            </View>
          )}

          <Text style={styles.title}> Title : {post?.title}</Text>

          <Text style={styles.desc}> {post?.description}</Text>
          <View style={styles.footer}>
            {post?.postedBy?.name && (
              <Text>
                <FontAwesome5Icon name="user" color={"orange"} />{" "}
                {post?.postedBy?.name}
              </Text>
            )}
            <Text>
              <FontAwesome5Icon name="clock" color={"orange"} />{" "}
              {moment(post?.createdAt).format("DD:MM:YYYY")}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    color: "green",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    width: "95%",
    backgroundColor: "#ffffff",
    borderWidth: 0.2,
    borderColor: "gray",
    padding: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 10,
    borderBottomWidth: 0.3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  desc: {
    marginTop: 10,
  },
});

export default PostCard;
