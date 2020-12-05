import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../utils/apiCaller';
import {actAddProductsRequest, actGetProductRequest} from '../../actions/index';
import { connect } from 'react-redux';

function ProductActionPage(props) {
  
  console.log('bước 3',props.itemEditing)
  const [id, setId] = useState('');
  const [txtName, setName] = useState('');
  const [txtPrice, setPrice] = useState('');
  const [chStatus, setStatus] = useState('');
  
  const onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    if (name === 'txtName') {
      setName(value)
    }
    if (name === 'txtPrice') {
      setPrice(value)
    }
    if (name === 'chStatus') {
      setStatus(value)
    }
  }
  const onSave = (e) => {
    var {history} = props;
    var product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chStatus
    }
    e.preventDefault();
    if(id){ // edit
      callAPI(`products/${id}`, 'PUT',{
        name: txtName,
        price: txtPrice,
        status: chStatus
      }).then(res=>{
        history.goBack();
      });
    }else{ // add
      props.onAddProduct(product);
      history.goBack();
    }
    
  }
  useEffect(() => {
      var {match} = props;
      if(match){
        var id = match.params.id
        props.onEditProduct(id);
      }
  }, []);

  useEffect(() => {
      var {itemEditing} = props;
        if(itemEditing){
          console.log('bước 4', itemEditing)
          setId(itemEditing.id);
          setName(itemEditing.name);
          setPrice(itemEditing.price);
          setStatus(itemEditing.status);
        }
    }, [props.itemEditing]);

  // if(props.itemEditing){
  //   var {itemEditing} = props;
  //   useEffect(() => {
  //     // var {itemEditing} = props;
  //     //   if(itemEditing){
  //     //     console.log('bước 4', itemEditing)
  //     //     setId(itemEditing.id);
  //     //     setName(itemEditing.name);
  //     //     setPrice(itemEditing.price);
  //     //     setStatus(itemEditing.status);
  //     //   }
  //     setId(itemEditing.id);
  //         setName(itemEditing.name);
  //         setPrice(itemEditing.price);
  //         setStatus(itemEditing.status);
  //   }, []);
  // }
  return (

    <div className="row">
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

        <form onSubmit={onSave}>
          <div className="form-group">
            <label>Tên Sản Phẩm : </label>
            <input
              type="text"
              className="form-control"
              name='txtName'
              value={txtName}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Giá : </label>
            <input
              type="number"
              className="form-control"
              name='txtPrice'
              value={txtPrice}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label>Trạng Thái : </label>
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name='chStatus'
                value={chStatus}
                onChange={onChange}
                checked={chStatus}
              />
              Còn Hàng
            </label>
          </div>

          <button type="submit" className="btn btn-primary mr-10">Lưu Lại</button>
          <Link to='/product-list' className="btn btn-danger">Trở Lại</Link>
        </form>

      </div>
    </div>

  );
}

const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditing
  }
}

const mapDispatchToProps = (dispatch, product) => {
  return{
    onAddProduct: product => {
      dispatch(actAddProductsRequest(product));
    },
    onEditProduct: id => {
      dispatch(actGetProductRequest(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
