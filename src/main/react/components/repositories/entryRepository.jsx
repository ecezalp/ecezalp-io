import React from 'react';
import firebase from '../../../firebase'

export default class EntryRepository {
  create(entry) {
    const entriesRef = firebase.database().ref('entries');
    entriesRef.push(entry);
  }
}