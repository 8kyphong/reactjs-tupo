import React, { Component } from 'react'
import { connect } from 'react-redux'
import { timNguoiDungAction, xoaNguoiDungAction, layThongTinNguoiDung, capNhatNguoiDung1 } from '../../../redux/actions/QuanLyNguoiDungAction'
import { khoaHocChuaGhiDanhAction, ghiDanhChoNguoiDung, khoaHocChoXacThuc, khoaHocDaGhiDanh, huyGhiDanh, xacThucKhoaHoc } from '../../../redux/actions/QuanLyKhoaHocAction';
import { Button, Modal, ModalHeader, ModalBody, Table } from "reactstrap";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tuKhoa: '',
            nguoiDung: {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                email: '',
                soDt: '',
                khoaHoc: '',
            },
            error: {
                taiKhoan: '',
                matKhau: '',
                hoTen: '',
                email: '',
                soDt: '',
                khoaHoc: '',
            },
            valid: false,
            isOpen: false,
            nguoiDungDangChon: '',
            maKhoaHoc: '',
        }
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    componentDidMount() {
        this.props.timKiem(this.state.tuKhoa);
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        console.log(name, value)
        this.setState({
            [name]: value,
            nguoiDung: { ...this.state.nguoiDung, [name]: value }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.timKiem(this.state.tuKhoa)
    }
    submitCapNhat = (e) => {
        this.props.capNhatNguoiDung(this.state.nguoiDung);
        e.preventDefault();
    }

    ghiDanh = (taiKhoan) => {
        // console.log(taiKhoan)
        this.props.layKhoaHoc(taiKhoan);
    }
    handleGhiDanh = (e) => {
        e.preventDefault();
        this.props.ghiDanhChoNguoiDung(this.state.maKhoaHoc, this.state.nguoiDungDangChon)
    }
    renderKhoaHocChuaGhiDanh = () => {
        return this.props.khoaHocChuaGhiDanh.map((khoaHoc, index) => {
            return <option key={index} value={khoaHoc.maKhoaHoc}>{khoaHoc.tenKhoaHoc}</option >
        })
    }
    renderKhoaHocChoXacThuc = () => {
        return this.props.mangChoXet.map((khoaHoc, index) => {
            return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{khoaHoc.tenKhoaHoc}</td>
                <td>
                    <button onClick={() => this.props.ghiDanhChoNguoiDung(khoaHoc.maKhoaHoc, this.state.nguoiDungDangChon)}>Xác thực</button>
                    <button onClick={() => this.props.huyGhiDanhAction(khoaHoc.maKhoaHoc, this.state.nguoiDungDangChon)}>Hủy</button>
                </td>
            </tr>
        })
    }
    renderKhoaHocDaGhiDanh = () => {
        return this.props.khoaHocDaGhiDanh.map((khoaHoc, index) => {
            return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{khoaHoc.tenKhoaHoc}</td>
                <td>
                    <button onClick={() => this.props.huyGhiDanhAction(khoaHoc.maKhoaHoc, this.state.nguoiDungDangChon)}>Hủy</button>
                </td>
            </tr>
        })
    }

    renderKetQua() {
        let nguoiDung = this.props.ketQuaTimKiem;
        // console.log(nguoiDung);
        // console.log(this.state.nguoiDung);
        return nguoiDung.map((nguoiDung, index) => {
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{nguoiDung.taiKhoan}</td>
                    <td>{nguoiDung.matKhau}</td>
                    <td>{nguoiDung.hoTen}</td>
                    <td>{nguoiDung.email}</td>
                    <td>{nguoiDung.soDt}</td>
                    <td>
                        {/* <button data-toggle="modal" data-target="#modelId2" onClick={() => this.ghiDanh(nguoiDung.taiKhoan)}>Ghi Danh</button> */}
                        <button onClick={() => {
                            this.ghiDanh(nguoiDung.taiKhoan);
                            this.setState({ nguoiDungDangChon: nguoiDung.taiKhoan });
                            this.props.khoaHocChoXacThuc(nguoiDung.taiKhoan);
                            this.props.khoaHocDaGhiDanhAction(nguoiDung.taiKhoan)
                            this.toggleModal();

                        }} className="btn btn-success font-weight-bold">Ghi Danh</button>
                        <button className="btn btn-info mx-2 font-weight-bold" data-toggle="modal" data-target="#modelId" onClick={() => this.setState({ nguoiDung: nguoiDung })}>Sửa</button>
                        <button className="btn btn-danger font-weight-bold" onClick={() => {
                            this.props.xoaNguoiDung(nguoiDung.taiKhoan)
                        }}>Xóa</button>
                    </td>
                </tr >
            )
        });
    }


    renderNguoiDung() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <input className="form-control" name="tuKhoa" onChange={this.handleChange} />
                        <button type="submit">Tìm</button>
                    </form>
                    <table className="table">
                        <thead className="bg-secondary text-light text-center">
                            <tr>
                                <th>STT</th>
                                <th>Tài khoản</th>
                                <th>Mật khẩu</th>
                                <th>Họ tên</th>
                                <th>Email</th>
                                <th>Số điện thoại</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-dark text-white">
                            {this.renderKetQua()}
                        </tbody>
                    </table>
                </div>

                {/* Cập nhật người dùng */}
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
                                    <form onSubmit={this.submitCapNhat}>
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
                                                    <input name="soDt" className="form-control" onChange={this.handleChange} value={this.state.nguoiDung.soDt} />
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

                {/* GHI DANH */}
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>
                        <h5>Chọn khóa học</h5>
                        <form onSubmit={this.handleGhiDanh}>
                            <div className="form-group">
                                <h3>Danh mục khóa học</h3>
                                <select name="maKhoaHoc" className="form-control" onChange={this.handleChange}>
                                    {this.renderKhoaHocChuaGhiDanh()}
                                </select>
                            </div>
                            <button type="submit">Ghi Danh</button>
                        </form>
                    </ModalHeader>
                    <ModalBody>
                        <h5>Khóa học chờ xác thực</h5>
                        <Table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên khóa học</th>
                                    <th>Chờ xác nhận</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderKhoaHocChoXacThuc()}
                            </tbody>
                        </Table>
                        <h5>Khóa học đã ghi danh</h5>
                        <Table>
                            <thead>
                                <tr >
                                    <th>STT</th>
                                    <th>Tên khóa học</th>
                                    <th>Chờ xác nhận</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderKhoaHocDaGhiDanh()}
                            </tbody>
                        </Table>
                    </ModalBody>

                </Modal>

            </div>
        )
    }

    render() {
        return (
            <div>
                <h3 className="text-center text-secondary text-bold">
                    Danh sách người dùng
                </h3>
                {this.renderNguoiDung()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ketQuaTimKiem: state.QuanLyNguoiDungReducer.mangTimKiem,
    khoaHocChuaGhiDanh: state.QuanLyKhoaHocReducer.khoaHocChuaGhiDanh,
    mangChoXet: state.QuanLyKhoaHocReducer.mangChoXet,
    khoaHocDaGhiDanh: state.QuanLyKhoaHocReducer.khoaHocDaGhiDanh

})

const mapDispatchToProps = dispatch => {
    return {
        timKiem: (tenNguoiDung) => {
            dispatch(timNguoiDungAction(tenNguoiDung))
        },
        xoaNguoiDung: (taiKhoan) => {
            dispatch(xoaNguoiDungAction(taiKhoan))
        },
        layThongTinNguoiDung: (taiKhoan) => {
            dispatch(layThongTinNguoiDung(taiKhoan))
        },
        capNhatNguoiDung: (nguoiDung) => {
            dispatch(capNhatNguoiDung1(nguoiDung))
        },
        layKhoaHoc: (taiKhoan) => {
            dispatch(khoaHocChuaGhiDanhAction(taiKhoan))
        },
        ghiDanhChoNguoiDung: (maKhoaHoc, taiKhoan) => {
            dispatch(ghiDanhChoNguoiDung(maKhoaHoc, taiKhoan))
        },
        khoaHocChoXacThuc: (taiKhoan) => {
            dispatch(khoaHocChoXacThuc(taiKhoan))
        },
        khoaHocDaGhiDanhAction: (taiKhoan) => {
            dispatch(khoaHocDaGhiDanh(taiKhoan))
        },
        huyGhiDanhAction: (maKhoaHoc, taiKhoan) => {
            dispatch(huyGhiDanh(maKhoaHoc, taiKhoan))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)