
const config = require('./config');


class Cart {
    static addToCart(product = null, qty = 1, cart) {
        if(!this.inCart(product.product_id, cart)) {
            let format = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'INR' });
            let prod = {
              id: product.product_id,
              title: product.title,
              price: product.price,
              qty: qty,
              image: product.image,
              formattedPrice: format.format(product.price)
            };
            cart.items.push(prod);
            this.calculateTotals(cart);
        }
    }

    static removeFromCart(id = 0, cart) {
        for(let i = 0; i < cart.items.length; i++) {
            let item = cart.items[i];
            if(item.id === id) {
                cart.items.splice(i, 1);
                this.calculateTotals(cart);
            }
        }

    }

    static updateCart(ids = [], qtys = [], cart) {
        let map = [];
        let updated = false;

        ids.forEach(id => {
           qtys.forEach(qty => {
              map.push({
                  id: parseInt(id, 10),
                  qty: parseInt(qty, 10)
              });
           });
        });
        map.forEach(obj => {
            cart.items.forEach(item => {
               if(item.id === obj.id) {
                   if(obj.qty > 0 && obj.qty !== item.qty) {
                       item.qty = obj.qty;
                       updated = true;
                   }
               }
            });
        });
        if(updated) {
            this.calculateTotals(cart);
        }
    }

    static inCart(productID = 0, cart) {
        let found = false;
        cart.items.forEach(item => {
           if(item.id === productID) {
               found = true;
           }
        });
        return found;
    }

    static calculateTotals(cart) {
        cart.totals = 0.00;
        cart.items.forEach(item => {
            let price = item.price;
            let qty = item.qty;
            let amount = price * qty;

            cart.totals += amount;
        });
        this.setFormattedTotals(cart);
    }

   static emptyCart(request) {
        
        if(request.session) {
            request.session.cart.items = [];
            request.session.cart.totals = 0.00;
            request.session.cart.formattedTotals = '';
        }


    }

    static setFormattedTotals(cart) {
        let format = new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'INR' });
        let totals = cart.totals;
        cart.formattedTotals = format.format(totals);
    }

}

module.exports = Cart;

// module.exports = function Cart(cart) {
//     this.items = cart.items || {};
//     this.totalItems = cart.totalItems || 0;
//     this.totalPrice = cart.totalPrice || 0;

//     this.addToCart = function(item, id) {
//         var cartItem = this.items[id];
//         if (!cartItem) {
//             cartItem = this.items[id] = {item: item, quantity: 0, price: 0};
//         }
//         cartItem.quantity=cartItem.item.qty;
//         cartItem.price = cartItem.item.price;
//         this.totalItems++;
//         this.totalPrice += cartItem.item.price;
//     };

//     this.remove = function(id) {
//         this.totalItems -= this.items[id].quantity;
//         this.totalPrice -= this.items[id].price;
//         delete this.items[id];
//     };
    
//     this.getItems = function() {
//         var arr = [];
//         for (var id in this.items) {
//             arr.push(this.items[id]);
//         }
//         return arr;
//     };
// };