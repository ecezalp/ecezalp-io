import React from 'react';
import * as _ from 'lodash';
import {Link} from 'react-router-dom';

import alienBug from '../../../../resources/tiles/alien-bug.png';
import alienStare from '../../../../resources/tiles/alien-stare.png';
import astronautHelmet from '../../../../resources/tiles/astronaut-helmet.png';
import evilMinion from '../../../../resources/tiles/evil-minion.png';
import gluttonousSmile from '../../../../resources/tiles/gluttonous-smile.png';
import imp from '../../../../resources/tiles/imp.png';
import prettyFangs from '../../../../resources/tiles/pretty-fangs.png';
import rayGun from '../../../../resources/tiles/ray-gun.png';
import ringedPlanet from '../../../../resources/tiles/ringed-planet.png';
import unicorn from '../../../../resources/tiles/unicorn.png';


export default class Tiles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openTileIndices: [],
      tiles: [],
    };

    this.tilesDirtyHandler = this.tilesDirtyHandler.bind(this);
    this.tilesCleanHandler = this.tilesCleanHandler.bind(this);
    this.handleTileClose = this.handleTileClose.bind(this);
    this.handleTileOpen = this.handleTileOpen.bind(this);
    this.getTiles = this.getTiles.bind(this);
    this.cleanState = this.cleanState.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  componentDidMount() {
    this.resetGame();
  }

  resetGame() {
    this.setState({
      tiles: this.shuffle().map((name) => ({isOpen: false, isFound: false, name})),
    })
  }

  shuffle() {
    const tileNames = ["alien-bug", "alien-stare", "astronaut-helmet", "evil-minion", "gluttonous-smile", "imp", "pretty-fangs", "ray-gun", "ringed-planet", "unicorn"];
    return _.shuffle([...tileNames, ...tileNames]);
  }

  handleTileOpen(index) {
    this.state.openTileIndices.length > 0 ?
      this.tilesDirtyHandler(index) :
      this.tilesCleanHandler(index);
  }

  tilesDirtyHandler(index) {
    this.tilesCleanHandler(index);
    return setTimeout(() => {
      this.cleanState(this.state.tiles[index].name)
    }, 500);
  }

  cleanState() {
    let tiles;
    let targetTileName = this.state.tiles[this.state.openTileIndices[1]].name;

    if (targetTileName === this.state.tiles[this.state.openTileIndices[0]].name) {
      tiles = this.state.tiles
        .map(tile => Object.assign({}, tile, {
          isFound: (tile.name === targetTileName) ? true : tile.isFound,
          isOpen: false,
        }));
      this.setState({tiles, openTileIndices: []});
    } else {
      tiles = this.state.tiles
        .map(tile => Object.assign({}, tile, {isOpen: false}));
      this.setState({tiles, openTileIndices: []});
    }
  }

  tilesCleanHandler(index) {
    const tiles = _.cloneDeep(this.state.tiles);
    tiles[index] = Object.assign({}, this.state.tiles[index], {isOpen: true});

    const openTileIndices = _.clone(this.state.openTileIndices);
    openTileIndices.push(index);

    this.setState({tiles, openTileIndices});
  }

  handleTileClose(index) {
    const updateTiles = _.cloneDeep(this.state.tiles);
    updateTiles[index] = Object.assign({}, this.state.tiles[index], {isOpen: false});

    const openTileIndices = _.without(this.state.openTileIndices, index);

    this.setState({tiles: updateTiles, openTileIndices});
  }

  handleTileClick(index) {
    this.handleTileOpen(index);
    setTimeout(() => {
      this.handleTileClose(index);
    }, 5000);
  }

  getTiles(tiles) {
    return tiles.map((tile, index) =>
      <div
        className="tile"
        key={index}
        onClick={() => this.handleTileClick(index)}>
        {this.getTileFace(this.state.tiles[index])}
      </div>
    )
  }

  getTileFace(tile) {
    return tile.isFound ?
      <div/> :
      tile.isOpen ?
        <img src={this.getSrcByName(tile.name)}/> :
        <div className="placeholder"/>
  }

  getLinks() {
    return <div className="game-links">
      <Link className="link" to="/gallery/2">back</Link>
      <Link className="link" to="/gallery/3">next</Link>
      <Link className="home-link link" to="/">home</Link>
    </div>
  }

  render() {
    return <div className="tiles-parent">
      <div/>
      <div className="tiles-container">
        {this.getTiles(this.state.tiles)}
      </div>
      {this.getLinks()}
    </div>
  }

  getSrcByName(name) {
    switch (name) {
      case "alien-bug":
        return alienBug;
      case "alien-stare":
        return alienStare;
      case "astronaut-helmet":
        return astronautHelmet;
      case "evil-minion":
        return evilMinion;
      case "gluttonous-smile":
        return gluttonousSmile;
      case "imp":
        return imp;
      case "pretty-fangs":
        return prettyFangs;
      case "ray-gun":
        return rayGun;
      case "ringed-planet":
        return ringedPlanet;
      case "unicorn":
        return unicorn;
    }
  }
}
