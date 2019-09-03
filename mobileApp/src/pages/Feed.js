import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import io from 'socket.io-client';

import api from '../services/api';

// import { Container } from './styles';

import Camera from '../assets/camera.png';
import Comment from '../assets/comment.png';
import Like from '../assets/like.png';
import More from '../assets/more.png';
import Send from '../assets/send.png';

export default class Feed extends Component {
  static navigationOptions = ({navigation}) => ({
    headerRight: (
      <TouchableOpacity onPress={() => navigation.navigate('New')}>
        <Image
          style={{
            width: 30,
            height: 30,
            marginRight: 20,
            marginBottom: 10,
          }}
          source={Camera}
        />
      </TouchableOpacity>
    ),
  });

  state = {
    feed: [],
  };

  async componentDidMount() {
    this.registerToSocket();

    const response = await api.get('posts');

    console.log(response.data);

    this.setState({feed: response.data});
  }

  registerToSocket = () => {
    const socket = io('http://localhost:3333');

    socket.on('post', newPost => {
      this.setState({feed: [newPost, ...this.state.feed]});
    });

    socket.on('like', likedPost => {
      this.setState({
        feed: this.state.feed.map(post =>
          post._id === likedPost._id ? likedPost : post,
        ),
      });
    });
  };

  handleLike = id => {
    api.post(`/posts/${id}/likes`);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.feed}
          keyExtractor={post => post._id}
          renderItem={({item}) => (
            <View style={styles.feedItem}>
              <View style={styles.feedItemHeader}>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.author}</Text>
                  <Text style={styles.place}>{item.place}</Text>
                </View>
                <Image
                  style={{
                    width: 20,
                    height: 20,
                  }}
                  source={More}
                />
              </View>

              <Image
                style={styles.feedImage}
                source={{uri: `http://localhost:3333/files/${item.image}`}}
              />

              <View style={styles.feedItemFooter} />
              <View style={styles.actions}>
                <TouchableOpacity onPress={() => this.handleLike(item._id)}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 4,
                      marginRight: 8,
                    }}
                    source={Like}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 8,
                    }}
                    source={Comment}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {}}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      marginRight: 8,
                    }}
                    source={Send}
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.likes}>{item.likes} curtidas</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.hashtags}>{item.hashtags}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  feedItem: {
    marginTop: 20,
  },

  feedItemHeader: {
    paddingHorizontal: 15,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 14,
    color: '#000',
  },

  place: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },

  feedImage: {
    width: '100%',
    height: 400,
    marginVertical: 15,
  },

  feedItemFooter: {
    paddingHorizontal: 15,
  },

  actions: {
    flexDirection: 'row',
  },

  likes: {
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 4,
  },

  description: {
    lineHeight: 18,
    color: '#000',
    marginLeft: 4,
  },

  hashtags: {
    color: '#7159c1',
    marginLeft: 4,
  },
});
