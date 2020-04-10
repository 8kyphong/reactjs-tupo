import React, { Component } from 'react'
import { connect } from 'react-redux';
import { timKiemKhoaHocAction, xoaKhoaHoc, capNhatKhoaHoc, ghiDanhKhoaHoc } from '../../../redux/actions/QuanLyKhoaHocAction';
import { Button, Modal, ModalHeader, ModalBody, Table } from "reactstrap";
import { nguoiDungChuaGhiDanh, hocVienDaThamGiaKhoaHoc, huyGhiDanh, danhSachNguoiDungChoDuyet } from '../../../redux/actions/QuanLyNguoiDungAction';

class CourseListAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tuKhoa: '',
            khoaHocDangChon: '',
            taiKhoan: '',
            valid: false,
            isOpen: false,
        }
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        })
    }

    componentDidMount() {
        this.props.timKiemKhoaHocAction(this.state.tuKhoa)
    }
    handleChange = (e) => {
        let { name, value } = e.target;
        console.log(name, value);
        this.setState({
            [name]: value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.timKiemKhoaHocAction(this.state.tuKhoa)
    }
    handleGhiDanh = (e) => {
        e.preventDefault();
        this.props.ghiDanhKhoaHocAction(this.state.khoaHocDangChon, this.state.taiKhoan);
        this.toggleModal();
    }

    renderNguoiDungChuaGhiDanh = () => {
        return this.props.mangChuaGhiDanh.map((nguoiDung, index) => {
            return <option key={index}>{nguoiDung.taiKhoan}</option>
        })
    }
    renderHocVienDaHoc = () => {
        return this.props.mangHVDaHoc.map((hocVien, index) => {
            return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{hocVien.taiKhoan}</td>
                <td>{hocVien.biDanh}</td>
                <td>
                    <button onClick={() => {
                        this.props.huyGhiDanhAction(this.state.khoaHocDangChon, hocVien.taiKhoan);
                        this.toggleModal()
                    }}>Hủy</button>
                </td>
            </tr>
        })
    }
    renderNguoiDungChoDuyet = () => {
        return this.props.mangNguoiDungChoDuyet.map((nguoiDung, index) => {
            return <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{nguoiDung.taiKhoan}</td>
                <td>{nguoiDung.biDanh}</td>
                <td>
                    <button onClick={() => {
                        this.props.ghiDanhKhoaHocAction(this.state.khoaHocDangChon, nguoiDung.taiKhoan);
                        this.toggleModal();
                    }}>Xác thực</button>
                    <button onClick={() => {
                        this.props.huyGhiDanhAction(this.state.khoaHocDangChon, nguoiDung.taiKhoan);
                        this.toggleModal()
                    }}>Hủy</button>
                </td>
            </tr>
        })
    }

    renderTimKiemKhoaHoc() {
        let mangKhoaHoc = this.props.mangKhoaHocTimKiem;
        console.log(mangKhoaHoc)
        return mangKhoaHoc.map((khoaHoc, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{khoaHoc.maKhoaHoc}</td>
                    <td>{khoaHoc.tenKhoaHoc}</td>
                    <td><img src={khoaHoc.hinhAnh} width="50px" height="50px" alt="" /></td>
                    <td>{khoaHoc.luotXem}</td>
                    <td>{khoaHoc.nguoiTao.taiKhoan}</td>
                    <td>
                        <button onClick={() => {
                            this.props.nguoiDungChuaGhiDanhAction(khoaHoc.maKhoaHoc);
                            this.setState({ khoaHocDangChon: khoaHoc.maKhoaHoc, taiKhoan: khoaHoc.nguoiTao.taiKhoan });
                            this.props.hocVienDaHoc(khoaHoc.maKhoaHoc);
                            this.props.layDanhSachChoDuyet(khoaHoc.maKhoaHoc)
                            this.toggleModal()
                        }} className="btn btn-success font-weight-bold">Ghi Danh</button>
                        <button className="btn btn-info mx-2 font-weight-bold">Sửa</button>
                        <button onClick={() => this.props.xoaKhoaHocAction(khoaHoc.maKhoaHoc)}
                            className="btn btn-danger font-weight-bold">Xóa</button>
                    </td>
                </tr>
            )
        })
    }
    renderKhoaHoc() {
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
                                <th>Mã khóa học</th>
                                <th>Tên khóa học</th>
                                <th>Hình ảnh</th>
                                <th>Lượt xem</th>
                                <th>Người tạo</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="bg-dark text-white">
                            {this.renderTimKiemKhoaHoc()}
                        </tbody>
                    </table>
                </div>


                {/* Ghi danh */}
                <Modal isOpen={this.state.isOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>
                        <h5>Chọn người dùng</h5>
                        <form onSubmit={this.handleGhiDanh}>
                            <div className="form-group">
                                <h3>Người Dùng</h3>
                                <select name="taiKhoan" className="form-control" onChange={this.handleChange}>
                                    {this.renderNguoiDungChuaGhiDanh()}
                                </select>
                            </div>
                            <button type="submit">Ghi Danh</button>
                        </form>
                    </ModalHeader>
                    <ModalBody>
                        <h5>Học viên chờ xác thực</h5>
                        <Table>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tài khoản</th>
                                    <th>Họ tên</th>
                                    <th>Chờ xác nhận</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderNguoiDungChoDuyet()}
                            </tbody>
                        </Table>
                        <h5>Học viên đã tham gia khóa học</h5>
                        <Table>
                            <thead>
                                <tr >
                                    <th>STT</th>
                                    <th>Tài khoản</th>
                                    <th>Họ tên</th>
                                    <th>Chờ xác nhận</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderHocVienDaHoc()}
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
                    Danh sách khóa học
                </h3>
                {this.renderKhoaHoc()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    mangKhoaHocTimKiem: state.QuanLyKhoaHocReducer.mangTimKiem,
    mangChuaGhiDanh: state.QuanLyNguoiDungReducer.mangChuaGhiDanh,
    mangHVDaHoc: state.QuanLyNguoiDungReducer.mangHVDaThamGiaKH,
    mangNguoiDungChoDuyet: state.QuanLyNguoiDungReducer.mangNguoiDungChoDuyet,
})
const mapDispatchToProps = dispatch => {
    return {
        timKiemKhoaHocAction: (tuKhoa) => {
            dispatch(timKiemKhoaHocAction(tuKhoa))
        },
        xoaKhoaHocAction: (maKhoaHoc) => {
            dispatch(xoaKhoaHoc(maKhoaHoc))
        },
        capNhatKhoaHocAction: (khoaHoc) => {
            dispatch(capNhatKhoaHoc(khoaHoc))
        },
        nguoiDungChuaGhiDanhAction: (maKhoaHoc) => {
            dispatch(nguoiDungChuaGhiDanh(maKhoaHoc))
        },
        ghiDanhKhoaHocAction: (maKhoaHoc, taiKhoan) => {
            dispatch(ghiDanhKhoaHoc(maKhoaHoc, taiKhoan))
        },
        hocVienDaHoc: (maKhoaHoc) => {
            dispatch(hocVienDaThamGiaKhoaHoc(maKhoaHoc))
        },
        huyGhiDanhAction: (maKhoaHoc, taiKhoan) => {
            dispatch(huyGhiDanh(maKhoaHoc, taiKhoan))
        },
        layDanhSachChoDuyet: (maKhoaHoc) => {
            dispatch(danhSachNguoiDungChoDuyet(maKhoaHoc))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseListAdmin)