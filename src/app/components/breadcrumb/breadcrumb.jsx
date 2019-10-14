import React, {Component} from 'react';

class Breadcrumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumb: [],
      errorAplication: false
    }
  }

  componentDidMount() {
    if (this.props.data) {
      this.setState({
        breadcrumb: this.props.data
      })
    } else {
      this.setState({
        errorAplication: true
      })
    }
  }

  render() {
    return (
      <div className="breadcrumb-box">
        { this.state.breadcrumb.map((category, index) => <div className="breadcrumb-container" key={index}><span className="breadcrumb-text">{`${category}`}</span><span className="breadcrumb-symbol">{">"}</span></div>)}
      </div>
    )
  }
}

export default Breadcrumb;