import React from 'react';
import firebase from '../../../firebase'

export default class EntryRepository {

  create(entry) {
    let ref = firebase.database().ref('entries');
    ref.push(entry);
  }

  findAll() {
    let ref = firebase.database().ref('entries');
    return ref.once('value').then(function (snapshot) {
      return Object.keys(snapshot.val()).map(key => snapshot.val()[key]).reverse();
    }, function (error) {
      console.error(error);
    });
  }
}