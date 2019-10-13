import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class ItemDetail extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.getProdocutDetail = this.getProdocutDetail.bind(this);
  }

  componentDidMount() {
    if(this.props.match && this.props.match.params) {
      const id = this.props.match.params.id;
      this.getProdocutDetail(id);
    }
  }

  getProdocutDetail(id) {
    console.log(id);
    fetch(`/api/items/${id}`)
    .then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    })
  };

  render() {
    return (<div className="item-description">
      <label>Description</label>
    </div>);
  }
}

export default ItemDetail;