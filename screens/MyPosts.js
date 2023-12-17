import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import FooterMenu from "../components/Menus/FooterMenu";
import PostCard from "../components/PostCard";
import axios from "axios";

const MyPosts = () => {
  // local state
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // get user post
  const getUserPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/post/get-user-posts");
      setLoading(false);

      setPosts(data?.userPosts);
    } catch (error) {
      setLoading(false);
      console.log(error);
      alert(error);
    }
  };

  // initial
  useEffect(() => {
    getUserPosts();
  }, []);
  return (
    <View style={styles.container}>
          <ScrollView>
              <PostCard posts={posts} />
        {/* <Text> {JSON.stringify(posts, null, 4)}</Text> */}
      </ScrollView>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FooterMenu />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    margin: 5,
  },
});

export default MyPosts;
