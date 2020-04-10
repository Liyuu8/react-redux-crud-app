import React from 'react';

const App = () => {
  const profiles = [
    {
      name: 'Liyuu',
      age: 20,
    },
    {
      name: 'Raiyu',
      age: 10,
    },
    {
      name: 'NoName',
    },
  ];

  return (
    <div>
      {profiles.map((profile, index) => {
        return <User name={profile.name} age={profile.age} key={index}></User>;
      })}
    </div>
  );
};

const User = (props) => {
  return (
    <div>
      Hi, I am {props.name}, and {props.age} years old!
    </div>
  );
};

User.defaultProps = {
  age: 1,
};

export default App;
