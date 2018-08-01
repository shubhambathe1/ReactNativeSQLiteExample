import React, { Component } from 'react';
import { Text, View, Alert, Button } from 'react-native';

import SQLite from 'react-native-sqlite-2'

//let db
const db = SQLite.openDatabase('test.db', '1.0', '', 1);

var usersString = '';

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      username: ''
    };

    successCB = () => {
      console.log('SQL executed ...')
    }

    errorCB = (err) => {
      console.log('error: ', err)
      //this.state.progress.push('Error: ' + (err.message || err))
      //this.setState(this.state)
      return false
    }

    
    


  }



  doOperations() {

    db.transaction(function (tx) {
      
      // txn.executeSql('DROP TABLE IF EXISTS Users', []);
      // txn.executeSql('CREATE TABLE IF NOT EXISTS Users(user_id INTEGER PRIMARY KEY NOT NULL, name VARCHAR(30))', []);
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora']);
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya']);
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora2']);
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya2']);
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['nora3']);
      // txn.executeSql('INSERT INTO Users (name) VALUES (:name)', ['takuya3']);
      // txn.executeSql('SELECT * FROM `users`', [], function (tx, res) {
      //   for (let i = 0; i < res.rows.length; ++i) {

      //     //console.warn('item ' + i, res.rows.item(i).name);

      //     usersString = usersString + res.rows.item(i).name.toString() + " ";

      //     //console.warn('item ' + i, usersString);

      //     //Alert.alert(res.rows.item(i));
      //     //usersString = usersString + 

      //   }

      //   Alert.alert(usersString);



    tx.executeSql('DROP TABLE IF EXISTS Employees;')
    tx.executeSql('DROP TABLE IF EXISTS Offices;')
    tx.executeSql('DROP TABLE IF EXISTS Departments;')

    // this.state.progress.push('Executing CREATE stmts')
    // this.setState(this.state)

    tx.executeSql('CREATE TABLE IF NOT EXISTS Version( ' +
      'version_id INTEGER PRIMARY KEY NOT NULL); ', [])

    tx.executeSql('CREATE TABLE IF NOT EXISTS Departments( ' +
      'department_id INTEGER PRIMARY KEY NOT NULL, ' +
      'name VARCHAR(30) ); ', [])

    tx.executeSql('CREATE TABLE IF NOT EXISTS Offices( ' +
      'office_id INTEGER PRIMARY KEY NOT NULL, ' +
      'name VARCHAR(20), ' +
      'longtitude FLOAT, ' +
      'latitude FLOAT ) ; ', [])

    tx.executeSql('CREATE TABLE IF NOT EXISTS Employees( ' +
      'employe_id INTEGER PRIMARY KEY NOT NULL, ' +
      'name VARCHAR(55), ' +
      'office INTEGER, ' +
      'department INTEGER, ' +
      'FOREIGN KEY ( office ) REFERENCES Offices ( office_id ) ' +
      'FOREIGN KEY ( department ) REFERENCES Departments ( department_id ));', [])

    // this.state.progress.push('Executing INSERT stmts')
    // this.setState(this.state)

    tx.executeSql('INSERT INTO Departments (name) VALUES ("Client Services");', [])
    tx.executeSql('INSERT INTO Departments (name) VALUES ("Investor Services");', [])
    tx.executeSql('INSERT INTO Departments (name) VALUES ("Shipping");', [])
    tx.executeSql('INSERT INTO Departments (name) VALUES ("Direct Sales");', [])

    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Denver", 59.8,  34.);', [])
    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Warsaw", 15.7, 54.);', [])
    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Berlin", 35.3, 12.);', [])
    tx.executeSql('INSERT INTO Offices (name, longtitude, latitude) VALUES ("Paris", 10.7, 14.);', [])

    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Sylvester Stallone", 2,  4);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Elvis Presley", 2, 4);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Leslie Nelson", 3,  4);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Fidel Castro", 3, 3);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Bill Clinton", 1, 3);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Margaret Thatcher", 1, 3);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Donald Trump", 1, 3);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Dr DRE", 2, 2);', [])
    tx.executeSql('INSERT INTO Employees (name, office, department) VALUES ("Samantha Fox", 2, 1);', [])

    console.warn('all config SQL done')


    // tx.executeSql("SELECT * FROM 'Departments'", [], function (tx1, res) {
    //     for (let i = 0; i < res.rows.length; ++i) {

    //       //console.warn('item ' + i, res.rows.item(i).name);

    //       usersString = usersString + res.rows.item(i).name.toString() + " ";

    //       //console.warn('item ' + i, usersString);

    //       //Alert.alert(res.rows.item(i));
    //       //usersString = usersString + 

    //     }

    //     Alert.alert(usersString);
    //   });




    tx.executeSql("DELETE FROM Departments WHERE name=?", ['Shipping'])

    tx.executeSql("UPDATE Departments SET name='IT' WHERE name=?", ['Client Services'])


    tx.executeSql("SELECT * FROM 'Departments'", [], function (tx1, res) {
      
      for (let i = 0; i < res.rows.length; ++i) {

        usersString = usersString + res.rows.item(i).name.toString() + " ";

      }
      Alert.alert(usersString);
    
    });


  });

  }



  
  render() {
    return (
      <View>
        <Text>Hello React Native SQLite!</Text>
        <Button
  onPress={this.doOperations}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
      </View>
    );
  }
}