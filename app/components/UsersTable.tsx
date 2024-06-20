import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
import { Person } from '../models/person.interface';



// TODO: Move Headers to constants file
const headers = ['First Name', 'Last Name', 'Gender', 'Birth Date'];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Create base url in .env 
    axios.get('http://localhost:3000/person')
      .then(response => {
        setUsers(response.data.map((person: any) => ({
          ...person,
        })));
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.tableHeader}>
          {headers.map((header, index) => (
            <Text key={index} style={styles.tableHeaderText}>{header}</Text>
          ))}
        </View>
        {users.map(user => (
          <View key={user._id} style={styles.tableRow}>
            <Text style={styles.tableCell}>{user.firstName}</Text>
            <Text style={styles.tableCell}>{user.lastName}</Text>
            <Text style={styles.tableCell}>{user.gender}</Text>
            {/* TODO: Create date format enum */}
            <Text style={styles.tableCell}>{dayjs(user.birthDate).format('YYYY-MM-DD')}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    marginBottom: 10,
    width: '100%',
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default UserTable;
