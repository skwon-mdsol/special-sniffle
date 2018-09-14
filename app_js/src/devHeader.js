import React from 'react';
import ReactDOM from 'react-dom';

import PlatformHeader from 'lego/lib/PlatformHeader';
import 'sandman-bower/assets/platform_header.css';
import logo from 'sandman-bower/assets/Medidata_Logo_white.png';

ReactDOM.render(
  <PlatformHeader homeUrl='/' logoUrl={logo} />,
  document.getElementById('dev-header')
);

