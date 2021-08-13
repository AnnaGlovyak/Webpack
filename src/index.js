import _ from 'lodash';
import printMe from './print';
import json from './assets/jsonfail';
import './styles/style.css';
// import foto from './img/foto.jpg';

import {header} from '@components/header/header'
import { footer } from '@components/footer/footer';


function component() {
    const element = document.querySelector('div');
    const btn = document.createElement('button');
  
    // Lodash, currently included via a script, is required for this line to work
    element.innerHTML = _.join(['Hello', 'webpack!'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    console.log(json);
    // const myFoto = new Image();
    // myFoto.src = foto;

    // element.appendChild(myFoto);
  
    return element;
  }
  
  document.body.appendChild(component());

  header();
  footer()