const pack = require('../../../package.json');

class Author {
  constructor() {};

  static getAuthor() {
    return {
      name:  pack.author.name,
      lastname: pack.author.lastname
    }
  }
}

class Breadcrumb {
  constructor(){}

  static buildCategories(categories) {
    return categories.map(categories => categories.name);
  }
}

class Item {
  constructor() {};
  // static method for single item model

  static getItem(item, shippingSoldInfo) {
    const description = {
      sold_quantity: item.sold_quantity ? item.sold_quantity : undefined
    }
    //adding address to model because the view require it
    const itemModel = {
      id: item.id || '',
      title: item.title || '',
      price: {
        currency: item.currency_id || '',
        amount: item.price || 0,
        decimals: item.price ? item.price - Math.floor(item.price) : 0
      },
      picture: item.thumbnail || '', 
      condition: item.condition || '',
      free_shipping: item.shipping ? item.shipping.free_shipping : undefined,
      address: item.address.state_name || ''
    }
    
    return shippingSoldInfo ? Object.assign(itemModel, description) : itemModel;
  
  }

  static getItems(items) {
    let itemsResolver = [];
    const notShippingSoldInfo = false;
    
    items.forEach((item) => {
      itemsResolver.push(this.getItem(item, notShippingSoldInfo));
    });

    return itemsResolver;
  }
}

module.exports = function ItemBuilder(data) {
  if (data.items && data.category) {
    return {
      author: Author.getAuthor(),
      categories: Breadcrumb.buildCategories(data.category),
      items: Item.getItems(data.items)
    }
  }
};