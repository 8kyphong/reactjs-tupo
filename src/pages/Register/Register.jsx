import React, { Component } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { dangKyNguoiDungAction } from '../../redux/actions/QuanLyNguoiDungAction';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nguoiDung: {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                email: '',
                soDT: '',
            },
            error: {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                email: '',
                soDT: '',
            },
            valid: false,
        }
    }

    handleChange = (e) => {
        let { value, name } = e.target;
        this.setState({
            nguoiDung: { ...this.state.nguoiDung, [name]: value }
        })
        console.log(value, name);
    }
    callback = () => {
        let history = useHistory();
        history.push("/login");
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dangKyNguoiDung(this.state.nguoiDung, this.callback);
    }



    handleError = (e) => {
        let { value, name } = e.target;
        //Lỗi rỗng
        let loi = value === '' ? 'Không được để trống' : '';


        //Lỗi email
        if (name === 'email') {
            let regex = value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/);
            if (!regex) {
                loi = 'email không đúng định dạng'
            } else {
                loi = '';
            }
        }

        this.state.valid = loi === '' ? true : false;
        this.setState({
            error: { ...this.state.error, [name]: loi }
        })
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">

                        </div>
                        <div className="col-6">
                            <form onSubmit={this.handleSubmit}>
                                <h3 className="text-center">Đăng ký</h3>
                                <div className="form-group">
                                    <input onKeyUp={this.handleError} onBlur={this.handleError}
                                        onChange={this.handleChange} value={this.state.nguoiDung.taiKhoan} name="taiKhoan" className="form-control" placeholder="Tài khoản" />
                                    {this.state.error.taiKhoan !== '' ? <div className="alert alert-danger">{this.state.error.taiKhoan}</div> : ''}
                                </div>
                                <div className="form-group">
                                    <input onKeyUp={this.handleError} onBlur={this.handleError}
                                        onChange={this.handleChange} value={this.state.nguoiDung.matKhau} name="matKhau" className="form-control" placeholder="Mật khẩu" />
                                    {this.state.error.matKhau !== '' ? <div className="alert alert-danger">{this.state.error.matKhau}</div> : ''}
                                </div>
                                <div className="form-group">
                                    <input onKeyUp={this.handleError} onBlur={this.handleError}
                                        onChange={this.handleChange} value={this.state.nguoiDung.hoTen} name="hoTen" className="form-control" placeholder="Họ tên" />
                                    {this.state.error.hoTen !== '' ? <div className="alert alert-danger">{this.state.error.hoTen}</div> : ''}
                                </div>
                                <div className="form-group">
                                    <input onKeyUp={this.handleError} onBlur={this.handleError}
                                        onChange={this.handleChange} value={this.state.nguoiDung.email} name="email" className="form-control" placeholder="Email" />
                                    {this.state.error.email !== '' ? <div className="alert alert-danger">{this.state.error.email}</div> : ''}
                                </div>
                                <div className="form-group">
                                    <input onKeyUp={this.handleError} onBlur={this.handleError}
                                        onChange={this.handleChange} value={this.state.nguoiDung.soDT} name="soDT" className="form-control" placeholder="Số điện thoại" />
                                    {this.state.error.soDT !== '' ? <div className="alert alert-danger">{this.state.error.soDT}</div> : ''}
                                </div>
                                <button type="submit" disabled={!this.state.valid}>Đăng ký</button>
                                <NavLink to='/login' className="btn btn-info">Đăng nhập</NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dangKyNguoiDung: (nguoiDung, callback) => {
        dispatch(dangKyNguoiDungAction(nguoiDung, callback));
    }
})
export default connect(null, mapDispatchToProps)(Register)