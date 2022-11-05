import React, { Component } from 'react';
import { DrizzleContext } from '@drizzle/react-plugin';
import { Drizzle } from '@drizzle/store'
import { LoadingContainer, AccountData, ContractData, ContractForm } from '@drizzle/react-components';

import Announcement from "./contracts/Announcement.json";
import {Components} from "./Components.js";
import './App.css';

const drizzleOptions = { 
  contracts: [
    Announcement
  ],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://localhost:7545'
    }
  }
};

const drizzle = new Drizzle(drizzleOptions);


const App = () => {
  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          const {drizzle, drizzleState, initialized} = drizzleContext;

          if(!initialized) {
            return "Loading..."
          }

          return (
            <Components drizzle={drizzle} drizzleState={drizzleState} />
            )
          }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;