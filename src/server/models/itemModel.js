
class Author {
  constructor() {};

  static getAuthor() {
    return {
      name:  'Facundo',
      lastname: 'Lavagnino'
    }
  }
}

class Item {
  constructor() {};
  // static method for single item model

  static getItem(item, shippingSoldInfo) {
    const description = {
      free_shipping: item.shipping ? item.shipping.free_shipping : undefined,
      sold_quantity: item.sold_quantity ? item.sold_quantity : undefined
    }

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

module.exports = function ItemModel(data) {
  if (data.results) {
    return {
      author: Author.getAuthor(),
      items: Item.getItems(data.results)
    }
  }
};