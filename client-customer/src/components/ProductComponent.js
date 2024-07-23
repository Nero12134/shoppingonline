import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      sort: 'default'
    };
    this.cmbSortChange = this.cmbSortChange.bind(this);
  }

  componentDidMount() {
    const params = this.props.params;
    if (params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  componentDidUpdate(prevProps) {
    const params = this.props.params;
    if (params.cid && params.cid !== prevProps.params.cid) {
      this.apiGetProductsByCatID(params.cid);
    } else if (params.keyword && params.keyword !== prevProps.params.keyword) {
      this.apiGetProductsByKeyword(params.keyword);
    }
  }

  apiGetProductsByKeyword(keyword) {
    axios.get('/api/customer/products/search/' + keyword).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  apiGetProductsByCatID(cid) {
    axios.get('/api/customer/products/category/' + cid).then((res) => {
      const result = res.data;
      this.setState({ products: result });
    });
  }

  cmbSortChange(e) {
    const sort = e.target.value;
    this.setState({ sort }, () => {
      let sortedProducts = [...this.state.products];
      if (sort === 'nameASC') {
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (sort === 'nameDESC') {
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      } else if (sort === 'priceASC') {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (sort === 'priceDESC') {
        sortedProducts.sort((a, b) => b.price - a.price);
      }
      this.setState({ products: sortedProducts });
    });
  }

  render() {
    const prods = this.state.products.map((item) => (
      <div key={item._id} className="inline">
        <figure>
          <Link to={'/product/' + item._id}>
            <img src={"data:image/jpg;base64," + item.image} width="300px" height="300px" alt="" />
          </Link>
          <figcaption className="text-center">
            {item.name}<br />Price: {item.price}
          </figcaption>
        </figure>
      </div>
    ));

    return (
      <div className="text-center">
        <h2 className="text-center">LIST PRODUCTS</h2>
        <div>
          <select value={this.state.sort} onChange={this.cmbSortChange}>
            <option value="default">-------Sort by-------</option>
            <option value="nameASC">Name (a → z)</option>
            <option value="nameDESC">Name (z → a)</option>
            <option value="priceASC">Price (low → high)</option>
            <option value="priceDESC">Price (high → low)</option>
          </select>
        </div>
        {prods}
      </div>
    );
  }
}

export default withRouter(Product);
