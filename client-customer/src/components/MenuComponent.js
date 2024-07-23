import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withRouter from '../utils/withRouter';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      txtKeyword: ''
    };
    this.ckbChangeMode = this.ckbChangeMode.bind(this);
    this.btnSearchClick = this.btnSearchClick.bind(this);
  }

  componentDidMount() {
    this.apiGetCategories();
  }

  ckbChangeMode(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-bs-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-bs-theme', 'light');
    }
  }

  btnSearchClick(e) {
    e.preventDefault();
    this.props.navigate('/product/search/' + this.state.txtKeyword);
  }

  apiGetCategories() {
    axios.get('/api/customer/categories').then((res) => {
      const result = res.data;
      this.setState({ categories: result });
    });
  }

  render() {
    const cates = this.state.categories.map((item) => (
      <li key={item._id} className="menu">
        <Link to={'/product/category/' + item._id}>{item.name}</Link>
      </li>
    ));

    return (
      <div className="border-bottom">
        <div className="float-left">
          <ul className="menu">
            <li className="menu">
              <Link to='/'>Home</Link>
            </li>
            {cates}
          </ul>
        </div>
        <div style={{ display: "inline" }} className="form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            onChange={this.ckbChangeMode}
          />
          &nbsp; Light / Dark mode
        </div>
        <div className="float-right">
          <form className="search">
            <input
              type="search"
              placeholder="Enter keyword"
              className="keyword"
              value={this.state.txtKeyword}
              onChange={(e) => this.setState({ txtKeyword: e.target.value })}
            />
            <input
              type="submit"
              value="SEARCH"
              className="confirmButt"
              onClick={this.btnSearchClick}
            />
          </form>
        </div>
        <div className="float-clear" />
      </div>
    );
  }
}

export default withRouter(Menu);