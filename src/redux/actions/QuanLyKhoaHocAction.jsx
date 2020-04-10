import { actionTypes } from '../constants/QuanLyKhoaHocConstant';
import { settings } from '../../common/config/settings'
import axios from 'axios';
import Swal from 'sweetalert2';
import { nguoiDungChuaGhiDanh } from './QuanLyNguoiDungAction';

export const layDanhMucKhoaHocAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + '/quanlykhoahoc/laydanhmuckhoahoc',
            method: 'GET',
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_DANH_MUC_KHOA_HOC,
                mangDanhMucKhoaHoc: result.data,
            });
        }).catch(error => {
            console.log(error.response.data)
        })
    }
}



/**Định nghĩa action lấy danh sách các khóa học gọi từ API */
export const layDanhSachKhoaHocAction = () => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoahoc?MaNhom=${'GP01'}`,
            method: 'GET',
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_DANH_SACH_KHOA_HOC,
                mangKhoaHoc: result.data,
            });
        }).catch(error => {
            console.log(error.response.data)
        })
    }
}


export const layChiTietKhoaHocAction = (maKhoaHoc) => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
            type: 'GET',
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_CHI_TIET_KHOA_HOC,
                thongTinKhoaHoc: result.data,
            })
        }).catch(error => {
            console.log(error.response.data)
        })
    }
}

export const themKhoaHocAction = (khoaHoc) => {
    let file = khoaHoc.hinhAnh;
    console.log(khoaHoc.hinhAnh);

    khoaHoc.hinhAnh = file.name;
    return distpatch => {
        axios({
            url: settings.domain + `/QuanLyKhoaHoc/ThemKhoahoc`,
            method: 'POST',
            data: { ...khoaHoc, maNhom: settings.groupID, ngayTao: '10/10/2019' },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            let frm = new FormData();
            frm.append('file', file);
            frm.append('tenKhoaHoc', result.data.tenKhoaHoc);
            axios({
                url: settings.domain + '/QuanLyKhoaHoc/UploadHinhAnhKhoaHoc',
                method: 'POST',
                data: frm,
            }).then(res => {
                console.log(res);
            }).catch(error => {
                console.log(error.response.data);
            })

        }).catch(error => {
            console.log(error.response.data)
        })
    }
}
export const dangKyKhoaHoc = (maKhoaHoc, taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyKhoaHoc/DangKyKhoaHoc`,
            method: 'POST',
            data: { maKhoaHoc, taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(res => {
            console.log(res);
            Swal.fire('Đăng ký thành công')
        }).catch(error => {
            console.log(error.response);
            if (error.response.data == "Đã đăng ký khóa học này rồi!") {
                Swal.fire(`${error.response.data}`)
            }

        })
    }
}

export const layKhoaHocTheoDanhMucAction = (maDanhMuc) => {
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}&MaNhom=GP01`,
            method: 'GET',
        }).then(result => {
            dispatch({
                type: actionTypes.LAY_KHOA_HOC_THEO_DANH_MUC,
                mangKhoaHocTheoDanhMuc: result.data,
            })
        }).catch(error => {
            console.log(error.response.data);
        });
    }
}

export const timKiemKhoaHocAction = (tenKhoaHoc) => {
    let tuKhoa = tenKhoaHoc.toLowerCase().replace(/\s/g, '');
    let URL = '';
    if (tuKhoa === '') {
        URL = settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?MaNhom=GP01`
    } else {
        URL = settings.domain + `/QuanLyKhoaHoc/LayDanhSachKhoaHoc?tenKhoaHoc=${tuKhoa}&MaNhom=GP01`
    };
    return dispatch => {
        axios({
            url: URL,
            method: 'GET',
        }).then(result => {
            dispatch({
                type: actionTypes.TIM_KIEM_KHOA_HOC,
                mangTimKiem: result.data,
            })
            console.log(result.data)
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const khoaHocChuaGhiDanhAction = (taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh',
            method: 'POST',
            data: { taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.KHOA_HOC_CHUA_GHI_DANH,
                khoaHocChuaGhiDanh: result.data,
            })
        }).catch(error => {
            console.log(error)
        })
    }
}

export const ghiDanhChoNguoiDung = (maKhoaHoc, taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyKhoaHoc/GhiDanhKhoaHoc',
            method: 'POST',
            data: { maKhoaHoc, taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            Swal.fire('Xác nhận đã ghi danh cho người dùng');
            khoaHocChuaGhiDanhAction(taiKhoan)
            khoaHocDaGhiDanh(taiKhoan)
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const khoaHocChoXacThuc = (taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet',
            method: 'POST',
            data: { taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data)
            dispatch({
                type: actionTypes.KHOA_HOC_CHO_XET,
                mangChoXet: result.data,
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const khoaHocDaGhiDanh = (taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet',
            method: 'POST',
            data: { taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            dispatch({
                type: actionTypes.KHOA_HOC_DA_GHI_DANH,
                khoaHocDaGhiDanh: result.data,
            })
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const huyGhiDanh = (maKhoaHoc, taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyKhoaHoc/HuyGhiDanh',
            method: 'POST',
            data: { maKhoaHoc, taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            Swal.fire('Hủy thành công')
        }).catch(error => {
            console.log(error)
        })

    }
}

export const xoaKhoaHoc = (maKhoaHoc) => {
    console.log(maKhoaHoc)
    return dispatch => {
        axios({
            url: settings.domain + `/QuanLyKhoaHoc/XoaKhoaHoc?maKhoaHoc=${maKhoaHoc}`,
            method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            Swal.fire('Xóa thành công');
            timKiemKhoaHocAction()
        }).catch(error => {
            console.log(error.response)
            Swal.fire('Không thể xóa')
        })
    }
}

export const capNhatKhoaHoc = (khoaHoc) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyKhoaHoc/CapNhatKhoaHoc',
            method: 'PUT',
            data: { khoaHoc },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            dispatch(
                timKiemKhoaHocAction(khoaHoc.tenKhoaHoc)
            );
        }).catch(error => {
            console.log(error.response)
        })
    }
}

export const ghiDanhKhoaHoc = (maKhoaHoc, taiKhoan) => {
    return dispatch => {
        axios({
            url: settings.domain + '/QuanLyKhoaHoc/GhiDanhKhoaHoc',
            method: 'POST',
            data: { maKhoaHoc, taiKhoan },
            headers: {
                "Authorization": "Bearer " + localStorage.getItem(settings.token)
            }
        }).then(result => {
            console.log(result.data);
            Swal.fire('Ghi danh thành công');
            dispatch(
                nguoiDungChuaGhiDanh(maKhoaHoc)
            )
        }).catch(error => {
            console.log(error.response);
        })
    }
}