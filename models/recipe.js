//update this with our schema of recipe
var mongoose = require('mongoose');
var db=mongoose.connection;


var recipeSchema=mongoose.Schema({
    rid:Number,
  name: String,
  image: String,
  imageId: String,  
  ingredients: [{
      n: {type: String},
      meas:{type:String},
      cal: {type:Number},
      note:{type:String}
  }],
  Steps: [{
      Num:{type:Number},
      desc:{type:String}
  }],
  Allergen:[{
      Num:{type:Number},
      type:{type:String}
  }],
  Serving: Number,
  Type: String
},{
collection:"Recipes"
});



// var recipes=mongoose.model('Recipes',recipeSchema);// dbo

// var obj=[
//     {rid:1,
//         name:'Surf and Turf Kebab',
//       image:"https://realhousemoms.com/wp-content/uploads/Surf-and-Turf-Kabobs-IG-768x768.jpg",
//       imageId: "001",
//       ingredients:[{n:"steak",meas:"200g",cal:542},
//                     {n:"prawn",meas:"400g", cal:460, note:"Fresh ones"},
//                     {n:"garlic oil",meas:"2 tablespoons", cal:248}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Sear the Steak with Garlic Oil on medium flame for 5 minutes."
//         },
//         {
//           Num:2,
//           desc:"Add the Prawns and switch off the flame and let it cook in the heat."
//         }],
//       Allergen:[
//         {
//           Num:1,
//           type:"Seafood"}],
//       Serving: 4,
//       Type:"Nonveg"   

//     },
//     {
//         rid:2,
//       name:"Pasta Salad",
//       image:"http://gooddinnermom.com/wp-content/uploads/135.jpg",
//       imageId:"002",
//       ingredients:[{n:"Fusili pasta",meas:"250g",cal:950},
//                     {n:"Tomatoes",meas:"150g", cal:25},
//                     {n:"Green Onion",meas:"75g", cal:24},
//                     {n:"Himalayan pink salt",meas:"1 teaspoon", cal:0}],
//       Steps:[
//           {
//               Num:1,
//               desc:"Boil the pasta for about 12 min or as per package instructions. Once cooked, drain the water and keep it in a bowl."
//           },
//           {
//               Num:2,
//               desc:"Dice the tomatoes and the greens of the onion and it to the pasta."
//           },
//           {
//               Num:3,
//               desc:"Add 1 tsp of the Himalayan pink salt or as per taste to the pasta. Give everything a good mix. Best served cold."
//           }],
//       Allergen:[
//           {
//               Num:1,
//               type:"Wheat"
//           }
//       ],
//       Serving: 2,
//       Type:"Vegan"
//     },
//     {//website:delicious
//         rid:3,
//       name:'Butter Radishes',
//       image:"https://www.seriouseats.com/recipes/images/2015/12/20151202-roasted-radishes-vicky-wasik-007.jpg",
//       imageId:"003",
//       ingredients:[{n:"Radishes",meas:"15g",cal:2.5,note:"3 medium sized radishes"},
//                     {n:"Unsalted Butter",meas:"100g", cal:717},
//                     {n:"Sesame oil",meas:"2 teaspoons", cal:80},
//                     {n:"Lemon",meas:"84g", cal:24,note:"juice of lemon"}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Melt butter and oil in large frypan over medium-high heat and cook for 3 minutes or until nut brown."
//         },
//         {
//           Num:2,
//           desc:"Add radish and cook, tossing pan, for 6-8 minutes or until tender. Spoon into a serving bowl."   
//         },
//         {
//           Num:3,
//           desc:"Drizzle over lemon juice and scatter with sesame seeds(optional)."
//         }],
//       Allergen:[
//         {
//           Num:1,
//           type:"Sesame"},
//         {
//           Num:2,
//           type:"Milk"
//           }],
//       Serving: 2,
//       Type:"Veg"
//     },
//     { //ndtv food
//         rid:4,
//       name:"Banana Oat Bread",
//       image:"https://www.tasteandtellblog.com/wp-content/uploads/2018/03/Banana-Oat-Bread-tasteandtellblog.com-1.jpg",
//       imageId:"004",
//       ingredients:[{n:"Whole Wheat Flour",meas:"170g",cal:620,note:"1 1/2 cups"},
//                     {n:"Oatmeal Flour",meas:"64g", cal:260},
//                     {n:"Bananas",meas:"350g", cal:300, note:"3 medium sized bananas "},
//                     {n:"Dark Brown Sugar",meas:"113.5g", cal:430,note:"3/4 cup"},
//                     {n:"Olive Oil", meas:"75g",cal:625,note:"1/3 cup Extra light virgin olive oil"},
//                     {n:"Egg",meas:"44g", cal:63,note:"1 medium egg"},
//                     {n:"Baking Powder",meas:"3/4 teaspoon",cal:0},
//                     {n:"Walnuts",meas:"20g", cal:130, note:"Chopped"}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Combine all dry ingredients in a bowl with a pinch of salt. Combine all wet ingredients in another bowl including mashed ripe bananas."
//         },
//         {
//           Num:2,
//           desc:"Fold in dry ingredients into the wet ingredients. Lightly oil a baking tin with olive oil."   
//         },
//         {
//           Num:3,
//           desc:"Add the banana bread batter into the baking tin. Sprinkle chopped walnuts. Place the baking tin in the oven and let it bake for about 50-55 mins in a 180 C preheated oven."
//         }],
//       Allergen:[
//         {
//           Num:1,
//           type:"Wheat"},
//         {
//           Num:2,
//           type:"Nuts"
//           },
//         {
//           Num:3,
//           type:"Egg"
//         }  ],
//       Serving: 6,
//       Type:"Veg"
//     },
//     { //ndtv food
//         rid:5,
//       name:'Melon and Kiwi Fruit Smoothie',
//       image:"https://thesaltymarshmallow.com/wp-content/uploads/2019/07/melon-smoothie1.jpg",
//       imageId:"005",
//       ingredients:[{n:"Kiwi",meas:"70g",cal:40, note:"1 full Kiwi"},
//                     {n:"Melon",meas:"100g", cal:70, note:"2-3 slices"},
//                     {n:"Grapes",meas:"50g", cal:35},
//                     {n:"Plum", meas:"66g",cal:30, note:"1 full plum"},
//                     {n:"Milk", meas:"226g", cal:130, note:"1 cup"},
//                     {n:"Honey",meas:"1 teaspoon", cal:20},
//                     {n:"Oats", meas:"60g", cal:250, note:"1/2 cup"}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Mix all the ingredients in a blender and blend well."
//         },
//         {
//           Num:2,
//           desc:"Serve chilled."
//         }],
//       Allergen:[
//         {
//           Num:1,
//           type:"Milk"}],
//       Serving: 2,
//       Type:"Veg"
//     },
//     {//ndtv food
//         rid:6,
//        name:"Baked Eggs",
//        image:"https://c.ndtvimg.com/2020-05/v33l6qrg_shakshuka_625x300_11_May_20.jpg",
//        imageId:"006",
//        ingredients:[{n:"Eggs",meas:"88g",cal:126, note:"2 medium eggs"},
//                     {n:"Onion",meas:"25g", cal:11, note:"Finely Chopped"},
//                     {n:"Tomatoes",meas:"50g", cal:10,note:"Finely Chopped"},
//                     {n:"Spinach", meas:"45g",cal:10, note:"1/4 cup"},
//                     {n:"Milk", meas:"56g", cal:30, note:"1/4 cup"},
//                     {n:"Butter",meas:"3 teaspoon", cal:100}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Crack eggs add salt and pepper to it."
//         },
//         {
//           Num:2,
//           desc:"In a pan heat butter and add finely chopped onions to it. Then add spinach, cherry tomato, some basil leaves to it."
//         },
//         {
//           Num:3,
//           desc:"Take a mould and put the vegetable mix in them. Then pour the whisked egg mixture."
//         },
//         {
//           Num:4,
//           desc:"Bake them in the oven for 5-6 minutes at 170-180 C. Serve Hot."
//         }],
//       Allergen:[
//         {
//           Num:1,
//           type:"Milk"},
//         {
//           Num:2,
//           type:"Egg"
//         }],
//       Serving: 2,
//       Type:"Veg" 
//     },
//     {//ndtv food
//         rid:7,
//        name:"Jowar Medley",
//        image:"https://www.indianhealthyrecipes.com/wp-content/uploads/2015/11/jowar-upma-recipe-500x500.jpg",
//        imageId:"007",
//        ingredients:[{n:"Jowar seeds",meas:"200g",cal:200, note:"1 cup"},
//                     {n:"Baby Corn",meas:"50g", cal:10, note:"Diced"},
//                     {n:"Zucchini",meas:"100g", cal:15,note:"Chopped"},
//                     {n:"Bell Peppers", meas:"200g",cal:63, note:"1 red and 1 yellow"},
//                     {n:"Peanut Oil", meas:"1 Tablespoon", cal:119},
//                     {n:"Ginger",meas:"1 tablespoon", cal:10}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Soak the jowar seeds overnight and boil it in the same water for 15 minutes."
//         },
//         {
//           Num:2,
//           desc:"Heat the peanut oil in a pan. Add green chillies(optional) and ginger."
//         },
//         {
//           Num:3,
//           desc:"Add baby corn, after a minute add the the zucchini.Add the red peppers and yellow peppers. Stir fry."
//         },
//         {
//           Num:4,
//           desc:"Add the salt , pepper & cooked jowar. Toss well."
//         }],
//       Allergen:[
//         {
//           Num:1,
//           type:"Nuts"}
//         ],
//       Serving: 4,
//       Type:"Vegan" 
//     },
//     {//website:tasteofhome
//         rid:8,
//       name:'Tomato & Avocado Sandwiches',
//       image:"https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F3637962.jpg",
//       imageId:"008",
//       ingredients:[{n:"Avocado",meas:"100g",cal:150,note:"1/2 Avocado, mashed"},
//                     {n:"Tomatoes",meas:"100g", cal:20, note:"1 sliced tomato"},
//                     {n:"Whole Wheat Bread",meas:"120g", cal:320, note:"4 slices,toated"},
//                     {n:"Hummus",meas:"60g", cal:100,note:"1/4 cup"}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Spread avocado over 2 slices of toast. Top with tomato slices."
//         },
//         {
//           Num:2,
//           desc:"Spread hummus over remaining toast slices; place on top of avocado toast, facedown on top of tomato layer."   
//         }],
//       Allergen:[
//         {
//           Num:1,
//           type:"Wheat"}],
//       Serving: 1,
//       Type:"Vegan"
//     },
//     {//website:bbcgoodfood
//         rid:9,
//       name:'Curried Cauliflower & Lentil Soup',
//       image:"https://www.connoisseurusveg.com/wp-content/uploads/2018/12/curried-cauliflower-soup-1-of-1.jpg",
//       imageId:"009",
//       ingredients:[{n:"Cauliflower",meas:"575g",cal:132,note:"1 chopped"},
//                     {n:"Red Lentils",meas:"150g", cal:171},
//                     {n:"Fennel Seeds",meas:"2 teaspoons", cal:14},
//                     {n:"Curry Paste",meas:"3 tablespoons", cal:54},
//                     {n:"Lemon",meas:"42g", cal:12,note:"juice of 1/2 lemon"}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Toss a quarter of the cauliflower florets in 1 tbsp oil and 1 tsp of the fennel seeds, season well. Set aside in roasting tin."
//         },
//         {
//           Num:2,
//           desc:"Heat oven to 220C/200C fan/gas 7. Heat 1/2 tbsp oil in a saucepan over a medium heat and add the remaining fennel seeds, toast for 2 mins, then add the lentils and the remaining cauliflower."   
//         },
//         {
//           Num:3,
//           desc:"Stir in the curry paste, then add 1 litre water and bring to the boil. Simmer for 25 mins until the cauliflower is tender and the lentils are cooked through."
//         },
//         {
//           Num:4,
//           desc:"Put the roasting tin of cauliflower in the oven and cook for 20 mins until crisp and slightly charred. Blitz in mixer and add lemon juice."
//         }],
//       Allergen:[],
//       Serving: 4,
//       Type:"Vegan"
//     },
//     {//website:simplyquinoa
//         rid:10, 
//       name:'Coconut Lime Quinoa',
//       image:"https://foodwithfeeling.com/wp-content/uploads/2014/09/Cilantro-Lime-Quinoa-51.jpg",
//       imageId:"010",
//       ingredients:[{n:"Coconut milk",meas:"226g",cal:800, note:"2 cups"},
//                     {n:"Quinoa",meas:"200g", cal:210, note:"1 cup"},
//                     {n:"Lime",meas:"134g", cal:40,note:"2, juice and zest"}],
//       Steps:[
//         {
//           Num:1,
//           desc:"Add coconut milk, quinoa and lime juice to a small sauce pan. Bring to a boil, cover and reduce to simmer for 12 - 15 minutes."
//         },
//         {
//           Num:2,
//           desc:"Stir in the zest of both limes after cooled and serve either as is or slightly reheated."
//         }],
//       Allergen:[],
//       Serving: 3,
//       Type:"Vegan"
//     }
    



// ];

// recipes.collection.insertMany(obj,function(err,res){
//     if (err) throw err;
//         console.log("Recipe_list Collection created and recipes entered= "+res.insertedCount);
//         db.close();
// });

// Define and export model to be used from app.js
module.exports = mongoose.model('Recipes', recipeSchema);