import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    
  }

  render() {
    return (<div className="item-description">
      <label>Description</label>
    </div>);
  }
}

export default ItemDetail;