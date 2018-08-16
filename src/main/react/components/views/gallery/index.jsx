import React from "react";
import {Link} from 'react-router-dom';

import ErnstKeller from './ernstKeller';
import LouisRoeschCo from './louisRoeschCo';

export default function Gallery({id}) {
  switch(id) {
    case "1":
      return <ErnstKeller/>;
    case "2":
      return <LouisRoeschCo/>;
    default:
      return <ErnstKeller/>;
  }
}