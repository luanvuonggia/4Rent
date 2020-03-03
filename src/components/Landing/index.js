import React, { useState, useEffect } from 'react';

function LandingPage()  {
  const [loading, setLoading] = useState(true);
  return (
  <div>
    <h1>Landing</h1>
    <p>The Landing Page is open to everyone, even though the user isn't signed in.</p>
  </div>
  )
}
export default LandingPage;
