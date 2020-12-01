
const mongoose  = require('mongoose');

let Schema  = mongoose.Schema;

let ProductsSchema = new Schema({
    product_id: Number,
    id: String,
    title: String,
    description: String,
    manufacturer: String,
    price: Number,
    image: String,
    dqty: Number,
    unit: String,
    belongs_to:[Number]
},{collection: 'products'});

var prdcts=mongoose.model('products',ProductsSchema)

// var obj=[
//     { //change img link
//         product_id:3,
//         id:'003',
//         title:'Fusili pasta',
//         description:'Durum wheat pasta',
//         manufacturer:'Happy chef',
//         price:95,
//         image:'https://pixabay.com/get/54e7d04b4b54b10ff3d89960c62e37781639d9e65156_640.jpg',
//         dqty:500,
//         unit: 'gm',
//         belongs_to:[2]
//       },
//       {
//         product_id:4,
//         id:'004',
//         title:'Tomatoes',
//         description:'Local, Organically Grown',
//         manufacturer:'Fresho',
//         price:10,
//         image:'https://s3-us-west-1.amazonaws.com/contentlab.studiod/getty/246623d990be42b7a60270fc0e188750.jpg',
//         dqty:500,
//         unit: 'gm',
//         belongs_to:[2]
//       },
//       {
//         product_id:5,
//         id:'005',
//         title:'Green Onion',
//         description:'',
//         manufacturer:'Fresho',
//         price:13,
//         image:'https://tiimg.tistatic.com/fp/1/006/353/farm-fresh-green-onion-612.jpg',
//         dqty:100,
//         unit: 'gm',
//         belongs_to:[2]
//       },
//       {
//         product_id:6,
//         id:'006',
//         title:'Himalayan pink salt',
//         description:'net Wt. 1kg',
//         manufacturer:'Finom',
//         price:89,
//         image:'https://5.imimg.com/data5/HI/HH/MY-7778582/finom-himalayan-salt-500x500.jpg',
//         dqty:1,
//         unit: 'kg',
//         belongs_to:[2]
//       },
//       {
//         product_id:7,
//         id:'007',
//         title:'Radishes',
//         description:'Organically grown',
//         manufacturer:'Fresho',
//         price:26,
//         image:'https://i.ndtvimg.com/mt/cooks/2014-11/radish.jpg',
//         dqty:500,
//         unit: 'gm',
//         belongs_to:[3]
//       },
//       {
//         product_id:8,
//         id:'008',
//         title:'Unsalted Butter',
//         description:'unsalted',
//         manufacturer:'Amul',
//         price:49,
//         image:'https://image.shutterstock.com/image-photo/jaipur-india-05-january-2020-600w-1606331581.jpg',
//         dqty:100,
//         unit: 'gm',
//         belongs_to:[3]
//       },
//       {
//         product_id:9,
//         id:'009',
//         title:'Sesame Oil',
//         description:'Cold pressed',
//         manufacturer:'',
//         price:88,
//         image:'https://5.imimg.com/data5/BL/OO/PP/SELLER-11092660/cold-pressed-white-sesame-oil-500x500.png',
//         dqty:200,
//         unit:'ml',
//         belongs_to:[3]
//       },
//       {
//         product_id:10,
//         id:'010',
//         title:'Lemon',
//         description:'',
//         manufacturer:'',
//         price:18,
//         image:'https://natashaskitchen.com/wp-content/uploads/2019/06/What-To-Do-With-Lemons.jpg',
//         dqty:250,
//         unit:'gm',
//         belongs_to:[3]
//       },
//       {
//         product_id:11,
//         id:'011',
//         title:'Whole Wheat Flour',
//         description:'Organic',
//         manufacturer:'',
//         price:51,
//         image:'https://5.imimg.com/data5/KC/UD/MY-6339954/wheat-flour-chakki-atta-500x500.jpg',
//         dqty:1,
//         unit: 'kg',
//         belongs_to:[4]
//       },
//       {
//         product_id:12,
//         id:'012',
//         title:'Oatmeal Flour',
//         description:'',
//         manufacturer:'Bobsred mill',
//         price:270,
//         image:'https://www.bobsredmill.com/media/catalog/product/cache/8646dbe0b50cb9bce8e481734e0f2ffe/1/9/1984s184_glutenfree_oatflour_f_3.jpg',
//         dqty:1,
//         unit: 'kg',
//         belongs_to:[4]
//       },
//       { //change img link
//         product_id:13,
//         id:'013',
//         title:'Bananas',
//         description:'',
//         manufacturer:'',
//         price:79,
//         image:'https://pixabay.com/get/54e4d14a4a53a514f1dc8460da29317e133cd9e2545478_640.jpg',
//         dqty:1,
//         unit: 'kg',
//         belongs_to:[4]
//       },
//       {
//         product_id:14,
//         id:'014',
//         title:'Dark Brown Sugar',
//         description:'',
//         manufacturer:'',
//         price:75,
//         image:'https://images.eatthismuch.com/site_media/img/145122_Shamarie84_9e439d04-b4c3-45e8-940b-c41b30dc5d12.jpeg',
//         dqty:1,
//         unit: 'kg',
//         belongs_to:[4]
//       },
//       {
//         product_id:15,
//         id:'015',
//         title:'Olive Oil',
//         description:'Extra virgin olive oil',
//         manufacturer:'Borges',
//         price:656,
//         image:'https://images-na.ssl-images-amazon.com/images/I/61zhi3LqGxL._SL1500_.jpg',
//         dqty:1,
//         unit: 'Litre',
//         belongs_to:[4]
//       },
//       {
//         product_id:16,
//         id:'016',
//         title:'Egg',
//         description:'Farm eggs, Antibiotic Residue-free',
//         manufacturer:'Fresho',
//         price:84,
//         image:'https://www.villages-news.com/wp-content/uploads/2019/12/Eggs.jpg',
//         dqty:12,
//         unit: 'pcs',
//         belongs_to:[4]
//       },
//       {
//         product_id:17,
//         id:'017',
//         title:'Baking Powder',
//         description:'',
//         manufacturer:'Weikfield',
//         price:20,
//         image:'https://5.imimg.com/data5/GI/HE/IS/SELLER-5611626/100gm-baking-powder-500x500.jpg',
//         dqty:50,
//         unit: 'g bottle',
//         belongs_to:[4]
//       },
//       {
//         product_id:18,
//         id:'018',
//         title:'Walnuts',
//         description:'',
//         manufacturer:'',
//         price:170,
//         image:'https://images-na.ssl-images-amazon.com/images/I/414Wq8UWTrL._SX466_.jpg',
//         dqty:100,
//         unit: 'g',
//         belongs_to:[4]
//       }
// ];

// prdcts.collection.insertMany(obj,function(err,res){
//     if (err) throw err;
//         console.log("Number of Ingredients added= "+res.insertedCount);
//         //db.close();
// });

module.exports = mongoose.model('Products', ProductsSchema);