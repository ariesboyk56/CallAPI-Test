import ProductItem from '../../components/ProductItem/ProductItem';
import ProductList from '../../components/ProductList/ProductList';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../utils/apiCaller';
import {actFetchProductsRequest, actDeleteProductsRequest} from '../../actions/index';



function ProductListPage(props) {
  var {products} = props;
  useEffect(() => {
    props.fetchAllProducts();
  }, []);

  const showProduct = (products) => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (<ProductItem
          key={index}
          product={product}
          index={index}
          onDelete={onDelete}
        />);
      });
    }
    return result;
  }
  const onDelete = (id) => {
  props.onDeleteProduct(id);
}

  return (
    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <Link to='/product/add' className="btn btn-info mb-10">Thêm Sản Phẩm</Link>
      <ProductList>
        {showProduct(products)}
      </ProductList>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
};
const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest())
    },
    onDeleteProduct: (id) => {
      dispatch(actDeleteProductsRequest(id))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
