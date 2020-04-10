import React, { Component } from 'react'
import { connect } from 'react-redux';
import { layThongTinNguoiDung, capNhatNguoiDung } from '../../redux/actions/QuanLyNguoiDungAction';

class UserInfo extends Component {

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
        });
        console.log(name, value)
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.capNhatNguoiDung(this.state.nguoiDung);
    }
    handleCancle = () => {
        let nguoiDungLocal = JSON.parse(localStorage.getItem('userLogin'));
        this.props.layThongTinNguoiDung(nguoiDungLocal.taiKhoan);
    }
    componentDidMount() {
        let nguoiDungLocal = JSON.parse(localStorage.getItem('userLogin'));
        this.props.layThongTinNguoiDung(nguoiDungLocal.taiKhoan);
    }

    componentDidUpdate(prev) {
        let nguoiDungStore = this.props.thongTinNguoiDung;
        if (prev.thongTinNguoiDung !== nguoiDungStore) {
            this.setState({
                nguoiDung: {
                    taiKhoan: nguoiDungStore.taiKhoan,
                    matKhau: nguoiDungStore.matKhau,
                    hoTen: nguoiDungStore.hoTen,
                    email: nguoiDungStore.email,
                    soDT: nguoiDungStore.soDT,
                },
            })
        }
    }

    render() {
        let nguoiDung = this.props.thongTinNguoiDung;
        console.log(nguoiDung)
        return (
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <p>Tài khoản: {nguoiDung.taiKhoan} </p>
                        <p>họ tên: {nguoiDung.hoTen}</p>
                    </div>
                    <div className="col-6">
                        <p>Email: {nguoiDung.email}</p>
                        <p>Số điện thoại: {nguoiDung.soDT}</p>
                        <div className="form-group">
                            <button data-toggle="modal" data-target="#modelId">Cập nhật</button>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="modelId" tabIndex={-1} role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cập nhật thông tin</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="container">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <span>Tài khoản</span>
                                                    <input name="taiKhoan" className="form-control" disabled onChange={this.handleChange} value={this.state.nguoiDung.taiKhoan} />
                                                </div>
                                                <div className="form-group">
                                                    <span>Mật khẩu</span>
                                                    <input name="matKhau" className="form-control" onChange={this.handleChange} value={this.state.nguoiDung.matKhau} />
                                                </div>
                                                <div className="form-group">
                                                    <span>Họ tên</span>
                                                    <input name="hoTen" className="form-control" onChange={this.handleChange} value={this.state.nguoiDung.hoTen} />
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="form-group">
                                                    <span>Email</span>
                                                    <input className="form-control" name="email" onChange={this.handleChange} value={this.state.nguoiDung.email} />
                                                </div>
                                                <div className="form-group">
                                                    <span>Số điện thoại</span>
                                                    <input name="soDT" className="form-control" onChange={this.handleChange} value={this.state.nguoiDung.soDT} />
                                                </div>
                                                <div className="form-group">
                                                    <button type="submit" className="btn btn-success closePopup">Cập nhật</button>
                                                    <button className="btn btn-secondary" data-dismiss="modal" onClick={this.handleCancle}>Hủy</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({
    thongTinNguoiDung: state.QuanLyNguoiDungReducer.thongTinNguoiDung,
})
const mapDispatchToProps = dispatch => ({
    layThongTinNguoiDung: (taiKhoan) => {
        dispatch(layThongTinNguoiDung(taiKhoan))
    },
    capNhatNguoiDung: (nguoiDung) => {
        dispatch(capNhatNguoiDung(nguoiDung))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo)

