const axios = require('axios');
const fs = require('fs');
const { matchSorter } = require('match-sorter');
const d = require('./rawData.json');

const getDrinks = query => {
    const config = {
        method: 'post',
        url: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${query}`,
        timeout: 4000,    // 4 seconds timeout
        data: {
          firstName: 'David',
          lastName: 'Pollock'
        }
    };
    
    return axios(config)
        .then(res => res.data)
        .catch(err => console.error(err));
}

const download = async () => {
    // const items = await Promise.all([...Array(26).keys()].map(async (offset) => {
    //     const firstLetter = String.fromCharCode(97 + offset);
    //     const { drinks } = await getDrinks(firstLetter);
    //     return drinks;
    // }));

    // const flatItems = items.flatMap(item => item);
    // fs.writeFileSync(__dirname + '/rawData.json', JSON.stringify(flatItems), err => console.error(err));

    const d = JSON.parse(fs.readFileSync(__dirname + '/rawData.json'));
    console.log(d.length);
};
const parse = items => {
    return items.flatMap(item => {
        // console.log('ITEM', item);
        if (!item) return [];
        const ingredients = [...Array(14).keys()].flatMap(count => {
            const ingredient = item[`strIngredient${count+1}`];
            return ingredient ? [ingredient] : [];
        });

        const measures = [...Array(14).keys()].flatMap(count => {
            const measure = item[`strMeasure${count+1}`];
            return measure ? [measure] : [];
        });
        
        return [{ 
            name: item.strDrink,
            id: item.idDrink,
            category: item.strCategory,
            alc: item.strAlcoholic,
            glass: item.strGlass,
            instructions: item.strInstructions,
            ingredients,
            measures,
        }];
    })
};

// const d = JSON.parse(fs.readFileSync(__dirname + '/rawData.json')).filter(item => item);
const parsedItems = parse(d);
console.log(parsedItems);
const glassesByIdLookup = (() =>
    parsedItems.reduce((glasses, item) => {
        if (glasses[item.glass]) {
            glasses[item.glass].push(item.id);
        } else {
            glasses[item.glass] = [item.id];
        }
    
        return glasses;
    }, {})
)();

const ingredientsByIdLookup = (() =>
    parsedItems.reduce((lookup, item) => {
        item.ingredients.forEach(ingredient => {
            if (lookup[ingredient]) {
                lookup[ingredient].push(item.id);
            } else {
                lookup[ingredient] = [item.id];
            }
        })
        return lookup;
    }, {})
)();

const masterTable = (() => {
    return parsedItems.reduce((table, item) => {
        table[item.id] = item;
        return table
    }, {})
})();

const allIngredients = Object.keys(ingredientsByIdLookup);
const searchIngredients = (...terms) => {
    const matches = terms.flatMap(term => {
        const matches = matchSorter(allIngredients, term);
        return matches ? matches.flatMap(match => ingredientsByIdLookup[match]) : [];
    });
    return matches.map(match => {
        return masterTable[match];
    });
};

// console.log(JSON.stringify(Object.keys(ingredientsByIdLookup)));
// console.log(glassesByIdLookup);
// console.log(ingredientsByIdLookup);
// console.log(parse(d)[0]);
// console.log(masterTable[13194]);
console.log(searchIngredients('Whiskey', 'Celery salt'));

export default searchIngredients;
/*
[
  'Cocktail glass',
  'Shot glass',
  'Martini Glass',
  'Highball Glass',
  'Highball glass',
  'Collins Glass',
  'Old-fashioned glass',
  'Whiskey sour glass',
  'Champagne Flute',
  'Old-Fashioned glass',
  'Margarita glass',
  'Beer pilsner',
  'Coupe Glass',
  'Punch bowl',
  'Coffee mug',
  'Beer mug',
  'Shot Glass',
  'Punch Bowl',
  'Pint glass',
  'Coffee Mug',
  'Hurricane glass',
  'Pitcher',
  'Beer Glass',
  'Collins glass',
  'Champagne flute',
  'Cocktail Glass',
  'Irish coffee cup',
  'Mason jar',
  'Balloon Glass',
  'Wine Glass',
  'Cordial glass',
  'Brandy snifter',
  'Copper Mug',
  'Nick and Nora Glass',
  'White wine glass',
  'Pousse cafe glass',
  'Margarita/Coupette glass'
]
*/
/*
strDrink => name
idDrink => uid
strCategory => type of drink
strAlcoholic => boolean
strGlass => type of glass
strInstructions => instructions
strIngredient1-15 => ingredients
strMeasure1-15 => measures
*/

// downloadAndParse();


// [
//     "Gin",
//     "Grand Marnier",
//     "Lemon Juice",
//     "Grenadine",
//     "Amaretto",
//     "Baileys irish cream",
//     "Cognac",
//     "Heavy cream",
//     "Milk",
//     "Egg White",
//     "Dark rum",
//     "Lemon juice",
//     "Absolut Vodka",
//     "Tonic water",
//     "151 proof rum",
//     "Wild Turkey",
//     "Applejack",
//     "Grapefruit juice",
//     "Strawberry schnapps",
//     "Orange juice",
//     "Cranberry juice",
//     "Club soda",
//     "Apple juice",
//     "Maraschino cherry",
//     "Vodka",
//     "Pisang Ambon",
//     "Lemonade",
//     "Peach nectar",
//     "Kahlua",
//     "Egg white",
//     "Vermouth",
//     "Light rum",
//     "Triple sec",
//     "Lime juice",
//     "Sugar",
//     "Mint",
//     "Scotch",
//     "Sweet Vermouth",
//     "Dry Vermouth",
//     "Orange bitters",
//     "lemon juice",
//     "maraschino liqueur",
//     "Creme de Cacao",
//     "Light cream",
//     "Nutmeg",
//     "Blended whiskey",
//     "Pineapple juice",
//     "Bourbon",
//     "Blackberry brandy",
//     "Lemon peel",
//     "Bitters",
//     "Soda water",
//     "Frangelico",
//     "Coffee",
//     "Cream",
//     "Creme de Banane",
//     "Sambuca",
//     "Orange Bitters",
//     "Green Chartreuse",
//     "Irish cream",
//     "Goldschlager",
//     "Champagne",
//     "Peach schnapps",
//     "Sugar syrup",
//     "Creme de Mure",
//     "Blue Curacao",
//     "Rye Whiskey",
//     "Maraschino Liqueur",
//     "Angostura Bitters",
//     "Maraschino Cherry",
//     "Maraschino liqueur",
//     "Passion fruit juice",
//     "Rum",
//     "Galliano",
//     "Pineapple Juice",
//     "Lime Juice",
//     "Prosecco",
//     "Corona",
//     "Bacardi Limon",
//     "Hot Chocolate",
//     "Cherry Heering",
//     "Wormwood",
//     "Ice",
//     "Sloe gin",
//     "Midori melon liqueur",
//     "Jägermeister",
//     "Banana liqueur",
//     "Southern Comfort",
//     "Lime",
//     "Sour mix",
//     "Everclear",
//     "Mountain Dew",
//     "Surge",
//     "Tomato juice",
//     "Worcestershire sauce",
//     "Tabasco sauce",
//     "Cherry",
//     "Lemon",
//     "Powdered sugar",
//     "Brandy",
//     "Egg",
//     "Cachaca",
//     "Cherry brandy",
//     "Coca-Cola",
//     "Spiced rum",
//     "Ginger ale",
//     "Falernum",
//     "Añejo rum",
//     "blackstrap rum",
//     "Port",
//     "Carbonated water",
//     "Water",
//     "Vanilla",
//     "Caramel coloring",
//     "White rum",
//     "Lager",
//     "Campari",
//     "Absolut Citron",
//     "Cointreau",
//     "Egg yolk",
//     "Wine",
//     "Vanilla extract",
//     "Chocolate liqueur",
//     "Chocolate",
//     "Grain alcohol",
//     "Peppermint extract",
//     "Food coloring",
//     "Almond flavoring",
//     "gin",
//     "Peach Bitters",
//     "Cider",
//     "Blackcurrant cordial",
//     "Fruit punch",
//     "Sprite",
//     "Tequila",
//     "Olive",
//     "Olive Brine",
//     "demerara Sugar",
//     "Pisco",
//     "Pineapple Syrup",
//     "St. Germain",
//     "Pepper",
//     "Lavender",
//     "Dark Rum",
//     "Ginger Beer",
//     "Whiskey",
//     "Hot Damn",
//     "Dubonnet Rouge",
//     "Cinnamon",
//     "Whipped cream",
//     "Absinthe",
//     "Chocolate syrup",
//     "Salt",
//     "Whipping cream",
//     "Vanilla syrup",
//     "Espresso",
//     "Condensed milk",
//     "Apricot brandy",
//     "Mezcal",
//     "Coffee liqueur",
//     "Orange",
//     "Benedictine",
//     "Yoghurt",
//     "Banana",
//     "Fruit",
//     "Honey",
//     "Figs",
//     "Thyme",
//     "Tonic Water",
//     "Strawberries",
//     "Apple",
//     "Apricot Nectar",
//     "Pomegranate juice",
//     "lemon",
//     "Soda Water",
//     "Raspberry Liqueur",
//     "pineapple juice",
//     "Lillet",
//     "Orange Peel",
//     "Fruit juice",
//     "Firewater",
//     "Absolut Peppar",
//     "Dr. Pepper",
//     "Beer",
//     "Sarsaparilla",
//     "Pineapple",
//     "Sugar Syrup",
//     "Orange peel",
//     "Peach Vodka",
//     "Sirup of roses",
//     "Red wine",
//     "Cloves",
//     "Grapefruit Juice",
//     "Orange spiral",
//     "Malibu rum",
//     "Sweet and sour",
//     "Green Creme de Menthe",
//     "Triple Sec",
//     "orange juice",
//     "Whisky",
//     "White Rum",
//     "Tea",
//     "Blackberries",
//     "Grape juice",
//     "Carbonated soft drink",
//     "Sherbet",
//     "Irish whiskey",
//     "Corn syrup",
//     "Cherry Juice",
//     "Red Chili Flakes",
//     "Ginger",
//     "Butter",
//     "Half-and-half",
//     "Marshmallows",
//     "Brown sugar",
//     "Coconut syrup",
//     "Iced tea",
//     "Peach brandy",
//     "Guinness stout",
//     "Aperol",
//     "Chambord raspberry liqueur",
//     "Anis",
//     "Jack Daniels",
//     "Jello",
//     "Mint syrup",
//     "Yellow Chartreuse",
//     "Apple brandy",
//     "Tennessee whiskey",
//     "Creme de Cassis",
//     "Absolut Kurant",
//     "Kiwi liqueur",
//     "Bitter lemon",
//     "Cranberry vodka",
//     "Apfelkorn",
//     "Schweppes Russchian",
//     "Kool-Aid",
//     "Kiwi",
//     "Papaya",
//     "Lime peel",
//     "Angostura bitters",
//     "Drambuie",
//     "Asafoetida",
//     "Cayenne pepper",
//     "Tia maria",
//     "Mango",
//     "Coconut Liqueur",
//     "Cumin seed",
//     "Cocoa powder",
//     "Orgeat syrup",
//     "Tomato Juice",
//     "Hot Sauce",
//     "Worcestershire Sauce",
//     "Soy Sauce",
//     "Pina colada mix",
//     "Daiquiri mix",
//     "Pepsi Cola",
//     "Cardamom",
//     "Black pepper",
//     "Cucumber",
//     "Butterscotch schnapps",
//     "White Creme de Menthe",
//     "Lemon-lime soda",
//     "Rye whiskey",
//     "Vanilla ice-cream",
//     "Oreo cookie",
//     "Bailey",
//     "Jagermeister",
//     "Orange Juice",
//     "Rosemary Syrup",
//     "Rosemary",
//     "Grape Soda",
//     "Apricot Brandy",
//     "Orange Curacao",
//     "Egg Yolk",
//     "Blended Scotch",
//     "Honey syrup",
//     "Ginger Syrup",
//     "Islay single malt Scotch",
//     "Coconut milk",
//     "Passoa",
//     "Passion fruit syrup",
//     "Cherry liqueur",
//     "Fresh Lime Juice",
//     "Pink lemonade",
//     "Coffee brandy",
//     "Lime vodka",
//     "Sherry",
//     "Black Sambuca",
//     "Raspberry syrup",
//     "7-Up",
//     "Crown Royal",
//     "Raspberry vodka",
//     "Ricard",
//     "Peychaud bitters",
//     "Advocaat",
//     "Jim Beam",
//     "Allspice",
//     "Godiva liqueur",
//     "Anisette",
//     "Fresca",
//     "Cherries",
//     "Curacao",
//     "Irish Whiskey",
//     "Celery salt",
//     "Coriander",
//     "Elderflower cordial",
//     "Rosso Vermouth",
//     "7-up",
//     "Melon Liqueur",
//     "Cranberry Juice",
//     "Yukon Jack",
//     "Agave syrup",
//     "Lillet Blanc",
//     "Maple syrup",
//     "Limeade",
//     "Cream of coconut",
//     "White Wine",
//     "Apple Brandy",
//     "Peachtree schnapps",
//     "Root beer",
//     "Gold rum",
//     "Pernod",
//     "Ouzo",
//     "Zima"
// ]