import React from 'react';
import './index.css';

import { Fab, Box, Grid, Chip, Card, Button, InputLabel, TextField, Typography, List, ListItem, ListItemText, CardContent, CardActions } from '@material-ui/core';
import { Add } from '@material-ui/icons';

const Group = ({ label, handleChange, handleRemove, value }) => {
  return   (
    <div className="container mx-auto">
      <Card>
        <CardContent>
          <InputLabel htmlFor={`${label}-group`}>
            <Typography gutterBottom variant="h5" component="h2">
              {label}
            </Typography>
          </InputLabel>
          <TextField id={`${label}-group`} multiline value={value} onChange={handleChange} />
        </CardContent>
        <CardActions>
          <Button size="small" color="secondary" onClick={handleRemove}>Remove</Button>
        </CardActions>
      </Card>
    </div>
  );
}

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

let mixerCount = 3;
function App() {
  const [state, dispatch] = React.useReducer(reducer, initState);
  React.useEffect(() => {
    console.log(state);
  })
  const handleClick = () => {
    const randIngredients = Object.values(state.ingredients).flatMap(value => {
      const items = value.split(/\r?\n/);
      const item = getRandom(items);
      return item ? [item] : [];
    });

    const formatDrink = (...randIngredients) => `${randIngredients.slice(0, -1).join(', ') + ' and ' + randIngredients.slice(-1)}`;

    dispatch({
      type: 'GENERATE_DRINK',
      payload: formatDrink(...randIngredients),
    })
  };

  const handleRemove = (label) => dispatch(removeIngredient(label));
  // Grid container justify="center" alignItems="flex-start" spacing={4}
  return (
    <div className="container mx-auto">
       <div className="grid gap-4 grid-cols-4">
      {
        Object.entries(state.ingredients).map(([key, value]) => (
          <Group key={key} label={key} value={value} handleChange={e => dispatch(addItem(key)(e))} handleRemove={() => handleRemove(key)} />
        ))
      }
      </div>
      <div style={{ 'alignSelf': 'center'}}>
      <Fab color="primary" aria-label="add" >
        <Add onClick={() => dispatch(addIngredient(`Mixers ${mixerCount++}`))} />
      </Fab>
      </div>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button size="medium" variant="contained" color="primary" onClick={handleClick}>Make a Drink</Button>
        </Box>
      </Grid>
      {state.drinks.length > 0 && <Typography color="primary" variant="h4">{state.drinks.slice(0, 1)} </Typography>}
      
      <Grid item xs={12}>
        <Box textAlign="center">
          <Typography color="textPrimary" variant="h5">
            Past Drinks
          </Typography>
          <List>
            {
              state.drinks.slice(1).map(drink => (
                <ListItem key={drink} alignItems="center">
                  <ListItemText primary={drink} />
                </ListItem>
              ))
            }
          </List>
        </Box>
      </Grid>
    </div>
   
  );
}

export default App;
