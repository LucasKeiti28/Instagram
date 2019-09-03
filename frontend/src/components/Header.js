import React from 'react';
import {Link} from 'react-router-dom';

import './Header.css';

import logo from '../assets/instagram.svg';
import camera from '../assets/camera.svg';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to='/'>
        <img className="image" src={logo} alt="InstaRocket"/>
        </Link>
        <Link to='/new'>
        <img className="image" src={camera} alt="Envia Pubilicacao"/>
        </Link>
      </div>
    </header>
  );
}
