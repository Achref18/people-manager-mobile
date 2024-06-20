import React from 'react';
import { View, StyleSheet } from 'react-native';
import UserTable from '../components/UsersTable';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <UserTable />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
});
