import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import api from '../services/api';

// import { Container } from './styles';

export default class New extends Component {
  static navigationOption = {
    headerTitle: 'Nova Publicaçāo',
  };

  state = {
    preview: null,
    image: null,
    author: '',
    place: '',
    description: '',
    hashtags: '',
  };

  handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar Imagem',
      },
      upload => {
        if (upload.error) {
          console.log('Error');
        } else if (upload.didCancel) {
          console.log('User Canceled');
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'HEIC' ? 'jpg' : ext;
          } else {
            prefix = new Date().getTime();
            ext = 'jpg';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };

          this.setState({preview, image});
        }
      },
    );
  };

  handleSubmit = async () => {
    const data = new FormData();

    data.append('image', this.state.image);
    data.append('author', this.state.author);
    data.append('place', this.state.place);
    data.append('description', this.state.description);
    data.append('hashtags', this.state.hashtags);

    await api.post('posts', data);

    this.props.navigation.navigate('Feed');
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={this.handleSelectImage}>
          <Text style={styles.selectButtonText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {this.state.preview && (
          <Image style={styles.preview} source={this.state.preview} />
        )}

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Nome do Autor"
          placeholderTextColor="#999"
          value={this.state.author}
          onChangeText={author => this.setState({author})}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Local da Foto"
          placeholderTextColor="#999"
          value={this.state.place}
          onChangeText={place => this.setState({place})}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Descriçāo da foto"
          placeholderTextColor="#999"
          value={this.state.description}
          onChangeText={description => this.setState({description})}
        />

        <TextInput
          style={styles.input}
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="#Hashtahgs"
          placeholderTextColor="#999"
          value={this.state.hashtags}
          onChangeText={hashtags => this.setState({hashtags})}
        />

        <TouchableOpacity
          style={styles.selectShareButton}
          onPress={this.handleSubmit}>
          <Text style={styles.selectShareButtonText}>Compartilhar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  preview: {
    width: 100,
    height: 100,
  },
});
