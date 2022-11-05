import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Drizzle, generateStore } from "@drizzle/store";
import Announcement from "./contracts/Announcement.json";

const root = ReactDOM.createRoot(document.getElementById('root'));

// let drizzle know what contracts we want
const options = { 
  contracts: [
    Announcement
  ]
};

// setup the drizzle store and drizzle
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

// pass in the drizzle instance
root.render(<App drizzle={drizzle} />);

