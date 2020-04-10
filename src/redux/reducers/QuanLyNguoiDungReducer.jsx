import { actionTypes } from "../constants/QuanLyNguoiDungConstant"

const initialState = {
    mangNguoidung: [],
    user: JSON.parse(localStorage.getItem('userLogin')) || null,
    thongTinNguoiDung: '',
    chiTietKhoaHoc: [],
    mangTimKiem: [],
    mangChuaGhiDanh: [],
    mangHVDaThamGiaKH: [],
    mangNguoiDungChoDuyet: [],
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LAY_DANH_SACH_NGUOI_TAO: {
            state.mangNguoidung = action.mangNguoiDung;
            return { ...state }
        };
        case actionTypes.DANG_NHAP: {
            state.user = action.taiKhoan;
            return { ...state }
        };
        case actionTypes.DANG_XUAT: {
            state.user = null;
            return { ...state }
        };
        case actionTypes.LAY_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            state.chiTietKhoaHoc = action.chiTietKhoaHoc;
            return { ...state };
        }
        case actionTypes.CAP_NHAT_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.nguoiDungCapNhat;
            return { ...state };
        }
        case actionTypes.TIM_NGUOI_DUNG: {
            state.mangTimKiem = action.ketQuaTimKiem;
            return { ...state }
        }
        case actionTypes.NGUOI_DUNG_CHUA_GHI_DANH: {
            state.mangChuaGhiDanh = action.nguoiDungChuaGhiDanh;
            return { ...state }
        }
        case actionTypes.HOC_VIEN_DA_THAM_GIA_KHOA_HOC: {
            state.mangHVDaThamGiaKH = action.mangHVDaThamGiaKH;
            return { ...state }
        }
        case actionTypes.NGUOI_DUNG_CHO_DUYET: {
            state.mangNguoiDungChoDuyet = action.mangNguoiDungChoDuyet;
            return { ...state }
        }

    }
    return { ...state }
}
