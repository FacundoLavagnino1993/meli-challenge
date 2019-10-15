const pack = require('../../../package.json');
const FROM_GET_PRODUCTS_SERVICE = 'getProductsService';
const FROM_GET_PRODUCT_DETAIL_SERVICE = 'getProductDetailService';

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

  static getItem(item, origin, description) {
    let itemModel = {
      id: item.id || '',
      title: item.title || '',
      price: {
        currency: item.currency_id || '',
        amount: item.price || 0,
        decimals: item.price ? item.price - Math.floor(item.price) : 0
      },
      condition: item.condition || '',
      free_shipping: item.shipping ? item.shipping.free_shipping : undefined
    }
    //append objects by request type
    switch(origin) {
      case FROM_GET_PRODUCTS_SERVICE:
        //adding address to model because the itemsList view require it
          Object.assign(itemModel, {
            picture: item.thumbnail || '',
            address: (item.address && item.address.state_name) ? item.address.state_name : ''
          })
        break;
      case FROM_GET_PRODUCT_DETAIL_SERVICE:
          Object.assign(itemModel, {
            picture: item.pictures[0].url || '',
            sold_quantity: item.sold_quantity,
            description: description
          })
        break
    };
    return itemModel;
  }

  static getItems(items) {
    let itemsResolver = [];
    items.forEach((item) => {
      itemsResolver.push(this.getItem(item, FROM_GET_PRODUCTS_SERVICE));
    });
    return itemsResolver;
  }
}

module.exports = function ItemBuilder(args) {
  let builder = {
    author: Author.getAuthor()
  };
  switch (args.origin) {
    case FROM_GET_PRODUCTS_SERVICE:
      Object.assign(builder, {
        categories: Breadcrumb.buildCategories(args.data.category),
        items: Item.getItems(args.data.items)
      });
      break;
    case FROM_GET_PRODUCT_DETAIL_SERVICE:
      Object.assign(builder, {
        categories: Breadcrumb.buildCategories(args.data.category),
        item: Item.getItem(args.data.item, FROM_GET_PRODUCT_DETAIL_SERVICE, args.data.description),
      });
      break;
  }
  return builder;
};