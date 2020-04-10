import React, { Component } from 'react';
import { connect } from 'react-redux';
import { themNguoiDungAction } from '../../../redux/actions/QuanLyNguoiDungAction';

class UserAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nguoiDung: {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                email: '',
                soDT: '',
                maLoaiNguoiDung: '',
            },
            error: {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                email: '',
                soDT: '',
                maLoaiNguoiDung: '',
            },
            valid: false
        }
    }
    componentDidMount() {

    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            nguoiDung: { ...this.state.nguoiDung, [name]: value }
        })
        console.log(name, value)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.themNguoiDung(this.state.nguoiDung)
    }
    handleError = (e) => {
        let { name, value } = e.target;

        //lỗi rổng
        let loi = value === '' ? 'Không được để trống' : '';

        //lỗi email
        if (name === 'email') {
            let regex = value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
            if (!regex) {
                loi = 'Email không đúng định dạng'
            } else {
                loi = '';
            }
        };

        //lỗi sdt
        if (name === 'soDT') {
            if (value.length > 10) {
                loi = 'Không được quá 9 chữ số'
            } else {
                loi = ''
            };
        }

        this.state.valid = loi === '' ? true : false;
        this.setState({
            error: { ...this.state.error, [name]: loi }
        })


    }

    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h3 className="display-4">Thêm người dùng</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <h3>Tài khoản</h3>
                            <input onKeyUp={this.handleError} onBlur={this.handleError} name="taiKhoan" className="form-control" onChange={this.handleChange} />
                            {this.state.error.taiKhoan !== '' ? <div className="alert alert-danger">{this.state.error.taiKhoan}</div> : ''}
                        </div>
                        <div className="form-group">
                            <h3>Mật khẩu</h3>
                            <input onKeyUp={this.handleError} onBlur={this.handleError} name="matKhau" className="form-control" onChange={this.handleChange} />
                            {this.state.error.matKhau !== '' ? <div className="alert alert-danger">{this.state.error.matKhau}</div> : ''}
                        </div>
                        <div className="form-group">
                            <h3>Họ tên</h3>
                            <input onKeyUp={this.handleError} onBlur={this.handleError} name="hoTen" className="form-control" onChange={this.handleChange} />
                            {this.state.error.hoTen !== '' ? <div className="alert alert-danger">{this.state.error.hoTen}</div> : ''}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <h3>email</h3>
                            <input onKeyUp={this.handleError} onBlur={this.handleError} name="email" className="form-control" onChange={this.handleChange} />
                            {this.state.error.email !== '' ? <div className="alert alert-danger">{this.state.error.email}</div> : ''}
                        </div>
                        <div className="form-group">
                            <h3>Số điện thoại</h3>
                            <input onKeyUp={this.handleError} onBlur={this.handleError} name="soDT" className="form-control" onChange={this.handleChange} />
                            {this.state.error.soDT !== '' ? <div className="alert alert-danger">{this.state.error.soDT}</div> : ''}
                        </div>
                        <div className="form-group">
                            <h3>Loại người dùng</h3>
                            <select name="maLoaiNguoiDung" className="form-control" onChange={this.handleChange}>
                                <option>GV</option>
                                <option>HV</option>
                            </select>
                        </div>
                        <button type="submit" disabled={!this.state.valid}>Thêm</button>
                    </div>
                </div>
            </form>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    themNguoiDung: nguoiDung => {
        dispatch(themNguoiDungAction(nguoiDung))
    }
})
export default connect(null, mapDispatchToProps)(UserAdd)