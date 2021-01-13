import React from 'react';
import './index.css';

import { Fab, Box, Grid, Chip, Card, Button, InputLabel, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import Group from './IngredientList';
import { IngredientProvider, useIngredient } from './IngredientList/ingredientContext';

const ChipGroup = ({ label, items }) => {
  return (
    <Grid item>
    <Card>
      <InputLabel htmlFor={`${label}-group`}>{label}</InputLabel>
      { 
        items && items.map && items.map(item => {
          return (<Chip label={item} />);
        })
      }
    </Card>
  </Grid>
  )
};

const getRandom = items => items[Math.floor(Math.random() * items.length)];


const reducer = (state = {}, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'ADD_ITEM':
      return {
          ...state,
          ingredients: {
            ...state.ingredients,
            ...action.payload,
          }
      }
    case 'GENERATE_DRINK':
      return {
        ...state,
        drinks: [
          action.payload,
          ...state.drinks,
        ],
      };
    case 'ADD_INGREDIENT':
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          ...action.payload,
        }
      }
    case 'REMOVE_INGREDIENT':
      const { [action.payload]: value, ...rest } = state.ingredients;
      return {
        ...state,
        ingredients: rest,
      };
  };
};

const addItem = label => e => ({
  type: 'ADD_ITEM',
  payload: {
    [label]: e.target.value,
  },
});

const addIngredient = label => ({
  type: 'ADD_INGREDIENT',
  payload: {
    [label]: '',
  },
});

const removeIngredient = label => ({
  type: 'REMOVE_INGREDIENT',
  payload: label,
});

const initState = {
  ingredients: {
    "Alcohol": 'Dark rum\nDragonberry\nWhiskey\nTriple Sec\nGin\nTequila\nMalibu',
    "Syrups": 'Grenadine\nBasil\nOrange',
    "Mixers": 'Lime\nPineapple\nMango\nGuava\nClub soda\nOrange Vanilla Coke',
    "Mixers 2": 'Lime\nPineapple\nMango\nGuava\nClub soda\nOrange Vanilla Coke',
  },
  drinks: [],
};

const newInitState = {
  ingredients: {
    "Alcohol": ['Dark rum', 'Dragonberry', 'Whiskey', 'Triple Sec', 'Gin', 'Tequila', 'Malibu'],
    "Syrups": ['Grenadine', 'Basil', 'Orange'],
    "Mixers": ['Lime', 'Pineapple', 'Mango', 'Guava', 'Club soda', 'Orange Vanilla Coke'],
    "Mixers 2": ['Lime', 'Pineapple', 'Mango', 'Guava', 'Club soda', 'Orange Vanilla Coke'],
  },
  drinks: [],
};

let mixerCount = 3;

const History = ({ drinks }) => {
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

const App = () => {
  // const [state, dispatch] = React.useReducer(reducer, initState);
  const [state, dispatch] = useIngredient();
  const [drinks, setDrinks] = React.useState([]);

  const handleClick = () => {
    const randIngredients = Object.values(state).flatMap(value => {
      const item = getRandom(value);
      return item ? [item] : [];
    });

    const formatDrink = (...randIngredients) => `${randIngredients.slice(0, -1).join(', ') + ' and ' + randIngredients.slice(-1)}`;

    const newDrink = formatDrink(...randIngredients);
    setDrinks(drinks => [newDrink, ...drinks]);
  };

  return (
    <div className="h-screen w-screen bg-gray-400">
      <div className="container mx-auto">
       <div className="grid gap-4 grid-cols-1 md:grid-cols-4 xl:grid-cols-6">
      {
        Object.keys(state).map( key => (
          <Group id={key} key={key} />
        ))
      }
      <div className="container shadow-xl mx-auto bg-gray-100 rounded-lg my-8 bg-blue w-full p-2 flex justify-center font-sans bg-opacity-25">
        <div className="rounded bg-grey-light w-64 p-2">
            {/* <Header id={id} /> */}
            <div className="mt-2">
                    {/* <Input id={id} /> */}
                <div className="flex flex-wrap justify-center">
                    {/* {items && items.length && items.map(item => <Chip item={item} handleClick={handleChipClick} />)} */}
                </div>
            </div>
        </div>
      </div>
      </div>
      <div style={{ 'alignSelf': 'center'}}>
      <Fab color="primary" aria-label="add" >
        <Add onClick={() => dispatch({
          type: 'ADD_INGREDIENT',
          payload: `Mixers ${mixerCount++}`,
          }) }
        />
      </Fab>
      </div>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button size="medium" variant="contained" color="primary" onClick={handleClick}>Make a Drink</Button>
        </Box>
      </Grid>
      {drinks.length > 0 && <Typography color="primary" variant="h4">{drinks.slice(0, 1)} </Typography>}
      <History drinks={drinks} />
      </div>
    </div>
  );
}

export default () => (
  <IngredientProvider>
    <App />
  </IngredientProvider>
);
