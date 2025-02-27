import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {notesAPI} from '../../services/api';
import AuthContext from '../../context/AuthContext';

const NotesScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const {logout} = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchNotes();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchNotes = async () => {
    try {
      const data = await notesAPI.getAllNotes();
      setNotes(data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch notes');
    }
  };

  const handleDeleteNote = async id => {
    try {
      await notesAPI.deleteNote(id);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete note');
    }
  };

  const handleLogout = () => {
    logout();
    navigation.replace('Login');
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.noteItem}
      onPress={() => navigation.navigate('NoteDetail', {note: item})}>
      <View>
        <Text style={styles.noteTitle}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.noteDescription}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNote(item._id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CreateNote')}>
        <Text style={styles.addButtonText}>Add New Note</Text>
      </TouchableOpacity>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        style={styles.list}
      />
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  list: {
    flex: 1,
  },
  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteDescription: {
    color: '#666',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default NotesScreen; 