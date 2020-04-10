import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, NavLink } from 'react-router-dom';
import { dangNhapAction } from '../../redux/actions/QuanLyNguoiDungAction'


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taiKhoan: '',
            matKhau: '',
        }
    }
    handleChange = (event) => {
        let { value, name } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dangNhap(this.state);
        this.props.history.push('/')
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <form className="container" onSubmit={this.handleSubmit}>
                    <h3>Đăng Nhập</h3>
                    <div className="form-group">
                        <span>Tài khoản</span>
                        <input name="taiKhoan" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <span>Mật khẩu</span>
                        <input name="matkhau" className="form-control" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <button type="submit">Đăng nhập</button>
                    </div>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        dangNhap: (thongTinNguoiDung) => {
            dispatch(dangNhapAction(thongTinNguoiDung));
        }
    }
}

export default connect(null, mapDispatchToProps)(Login)