import React from 'react';
import { NavLink } from 'react-router-dom';

import Contents from './Contents.jsx';

function NavBar() {
  return (
    <nav>
      <NavLink exact to="/">Home</NavLink>
    </nav>
  );
}

/* Base Page component which shows the static Navbar and the Contents */
export default function Page() {
  return (
    <div>
      <NavBar />
      <Contents />
    </div>
  );
}
