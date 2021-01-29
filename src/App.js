import React from 'react';
import './index.css';

import searchDrinks from './scripts/downloadDrinks';
import { Box, Grid, Button, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import Group from './IngredientList';
import { IngredientProvider, useIngredient } from './IngredientList/ingredientContext';
// import { setLocalStorage, getLocalStorage } from './Save/storage';
import NewHistory from './History';

const getRandom = items => items[Math.floor(Math.random() * items.length)];

const History = ({ drinks }) => {
  console.log('drinks', drinks)
  return (
    <Grid item xs={12}>
      <Box textAlign="center">
        <Typography color="textPrimary" variant="h5">
          Past Drinks
        </Typography>
        <List>
          {
            drinks.slice(1).map(drink => (
              <ListItem key={drink} alignItems="center">
                <ListItemText primary={drink} />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Grid>
  );
}

const instructions = [
  ['stir', 'shake'],
  ['ice', ''],
  ['shot', 'whiskey glass', 'high ball'],
];


// TODO: Add favorites
const App = () => {
  const [state] = useIngredient();
  const [drinks, setDefaultDrinks] = React.useState([]);
  const [newDrinks, setNewDrinks] =  React.useState([]);
  const setDrinks = (drink) => {
    // setLocalStorage('drinks', drink);
    setDefaultDrinks(drinks => [drink, ...drinks] );
  }
  const setNewNewDrinks = (drink) => {
    // setLocalStorage('drinks', drink);
    setNewDrinks(drink);
  }
  const handleClick = () => {
    const randIngredients = Object.values(state).flatMap(value => {
      const item = getRandom(value.items);
      return item ? [item] : [];
    });

    const drinks = searchDrinks(...randIngredients);
    console.log(drinks);
    // const formatDrink = (...randIngredients) => `${randIngredients.slice(0, -1).join(', ') + ' and ' + randIngredients.slice(-1)}`;

    const newDrink = getRandom(drinks)
    setDrinks(`${newDrink.name} (${newDrink.ingredients})`);
  };

  return (
    <div className="h-screen w-screen bg-gray-400">
      <div className="container mx-auto">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-6">
          <Group />
        </div>
        <div style={{ 'alignSelf': 'center' }}>
        </div>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Button size="medium" variant="contained" color="primary" onClick={handleClick}>Make a Drink</Button>
          </Box>
        </Grid>
        {drinks && drinks.length > 0 && <Typography color="primary" variant="h4">{drinks.slice(0, 1)} </Typography>}
        <History drinks={drinks} />
        {/* <NewHistory drinks={newDrinks} /> */}
      </div>
    </div>
  );
}

export default () => (
  <IngredientProvider>
    <App />
  </IngredientProvider>
);
