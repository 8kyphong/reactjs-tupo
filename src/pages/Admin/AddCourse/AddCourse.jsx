import React, { Component } from 'react';
import { connect } from 'react-redux';
import { layDanhSachNguoiTaoAction } from '../../../redux/actions/QuanLyNguoiDungAction'
import { layDanhMucKhoaHocAction, themKhoaHocAction } from '../../../redux/actions/QuanLyKhoaHocAction'


class AddCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            khoaHoc: {
                maKhoaHoc: '',
                tenKhoaHoc: '',
                taiKhoanNguoiTao: '',
                moTa: '',
                maDanhMucKhoaHoc: '',
                luotXem: '',
                hinhAnh: '',
            },
            error: {
                maKhoaHoc: '',
                tenKhoaHoc: '',
                taiKhoanNguoiTao: '',
                moTa: '',
                maDanhMucKhoaHoc: '',
                luotXem: '',
                hinhAnh: '',
            }
        }
    }
    handleChange = (e) => {
        //lấy thông tin từ các input control
        let { value, name, type } = e.target;
        if (type !== 'file') {
            this.setState({
                khoaHoc: { ...this.state.khoaHoc, [name]: value }
            }, () => {
                console.log(this.state.khoaHoc)
            })
        } else {
            //xử l1y khi post file
            console.log(e.target.files);
            this.setState({
                khoaHoc: { ...this.state.khoaHoc, [name]: e.target.files[0] }
            }, () => {
                console.log(this.state.khoaHoc)
            })

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        //gọi action ajax đưa dữ liệu về server
        this.props.themKhoaHoc(this.state.khoaHoc)
    }
    componentDidMount() {
        this.props.layDanhSachNguoiTao();
        //gọi action lấy danh mục khóa học
        this.props.layDanhMucKhoaHoc();

    }

    renderDanhMucKhoaHoc = () => {
        return this.props.mangDanhMucKhoaHoc.map((dmKhoaHoc, index) => {
            return <option key={index} value={dmKhoaHoc.maDanhMuc}>
                {dmKhoaHoc.tenDanhMuc}
            </option>
        })

    }
    renderNguoiTao = () => {
        return this.props.mangNguoiDung.map((nguoidung, index) => {
            return <option key={index} value={nguoidung.taiKhoan}>
                {nguoidung.hoTen}
            </option>
        })
    }
    render() {
        console.log(this.props.mangNguoidung);
        console.log(this.props.mangDanhMucKhoaHoc)
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <h3 className="display-4">Thêm khóa học</h3>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <h3>Mã khóa học</h3>
                            <input className="form-control" name="maKhoaHoc"
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <h3>Tên khóa học</h3>
                            <input className="form-control" name="tenKhoaHoc"
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <h3>Mô tả</h3>
                            <input className="form-control" name="moTa"
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <h3>Danh mục khóa học</h3>
                            <select className="form-control" name="maDanhMucKhoaHoc"
                                onChange={this.handleChange} >
                                {this.renderDanhMucKhoaHoc()}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-group">
                            <h3>Lượt xem</h3>
                            <input className="form-control" name="luotXem"
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <h3>Hình ảnh</h3>
                            <input type="file" className="form-control" name="hinhAnh"
                                onChange={this.handleChange} />
                        </div>
                        <div className="form-group">
                            <h3>Người tạo</h3>
                            <select className="form-control" name="taiKhoanNguoiTao"
                                onChange={this.handleChange}>
                                {this.renderNguoiTao()}
                            </select>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-success">
                                Thêm khóa học
                            </button>
                        </div>
                    </div>
                </div>
            </form >
        )
    }
}


export default connect(
    state => {
        return {
            mangNguoiDung: state.QuanLyNguoiDungReducer.mangNguoidung,
            mangDanhMucKhoaHoc: state.QuanLyKhoaHocReducer.mangDanhMucKhoaHoc,
        }
    },
    dispatch => {
        return {
            layDanhSachNguoiTao: () => {
                dispatch(layDanhSachNguoiTaoAction());
            },
            layDanhMucKhoaHoc: () => {
                dispatch(layDanhMucKhoaHocAction());
            },
            themKhoaHoc: (khoaHoc) => {
                dispatch(themKhoaHocAction(khoaHoc))
            }
        }
    }
)(AddCourse)