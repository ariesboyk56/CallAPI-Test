import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import callAPI from '../../utils/apiCaller';

function ProductActionPage(props) {
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
      callAPI('products', 'POST', {
        name: txtName,
        price: txtPrice,
        status: chStatus
      }).then(res=>{
        history.goBack();
      });
    }
    
  }
  useEffect(() => {
      var {match} = props;
      if(match){
        var id = match.params.id
        callAPI(`products/${id}`, 'GET', null).then(res => {
          var data = res.data;
          setId(data.id);
          setName(data.name);
          setPrice(data.price);
          setStatus(data.status)
        });
      }
  }, []);
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

export default ProductActionPage;
