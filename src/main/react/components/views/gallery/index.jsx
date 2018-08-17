import React from "react";
import {Link} from 'react-router-dom';

import ErnstKeller from './ernstKeller';
import LouisRoeschCo from './louisRoeschCo';
import Tiles from './tiles';

export default function Gallery({id}) {
  switch(id) {
    case "1":
      return <ErnstKeller/>;
    case "2":
      return <LouisRoeschCo/>;
    case "3":
      return <Tiles/>;
    default:
      return <ErnstKeller/>;
  }
}