import React from 'react';

function App() {
  // const greeting = 'Hi, Tom!';
  // return <h1 className="foo">{greeting}</h1>;
  return (
    <React.Fragment>
      <label htmlFor="bar">bar</label>
      <input
        type="text"
        onChange={() => {
          console.log('clicked!');
        }}
      ></input>
    </React.Fragment>
  );
}

export default App;
