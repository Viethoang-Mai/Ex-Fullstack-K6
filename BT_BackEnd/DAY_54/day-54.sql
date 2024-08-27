INSERT INTO phong (ma_phong, loai_phong, so_khach_toi_da, gia_phong ) VALUES ('P0001','Loai 1', 20, 60000);
INSERT INTO phong (ma_phong, loai_phong, so_khach_toi_da, gia_phong ) VALUES ('P0002','Loai 1', 25, 80000);
INSERT INTO phong (ma_phong, loai_phong, so_khach_toi_da, gia_phong ) VALUES ('P0003','Loai 2', 15, 50000);
INSERT INTO phong (ma_phong, loai_phong, so_khach_toi_da, gia_phong ) VALUES ('P0004','Loai 3', 20, 50000);

INSERT INTO khach_hang (ma_kh, ten_kh, dia_chi, so_dt ) VALUES ('KH0001','Nguyen Van A', 'Hoa xuan', 1111111111);
INSERT INTO khach_hang (ma_kh, ten_kh, dia_chi, so_dt ) VALUES ('KH0002','Nguyen Van B', 'Hoa hai', 1111111112);
INSERT INTO khach_hang (ma_kh, ten_kh, dia_chi, so_dt ) VALUES ('KH0003','Phan Van A', 'Cam le', 1111111113);
INSERT INTO khach_hang (ma_kh, ten_kh, dia_chi, so_dt ) VALUES ('KH0004','Phan Van B', 'Hoa xuan', 1111111114)

INSERT INTO dich_vu_di_kem (ma_dv, ten_dv, don_vi_tinh, don_gia) VALUES ('DV001','Beer', 'lon', 10000);
INSERT INTO dich_vu_di_kem (ma_dv, ten_dv, don_vi_tinh, don_gia) VALUES ('DV002','Nuoc ngot', 'lon', 8000);
INSERT INTO dich_vu_di_kem (ma_dv, ten_dv, don_vi_tinh, don_gia) VALUES ('DV003','Trai cay', 'dia', 35000);
INSERT INTO dich_vu_di_kem (ma_dv, ten_dv, don_vi_tinh, don_gia) VALUES ('DV004','Khan uot', 'cai', 2000)

INSERT INTO dat_phong (ma_dat_phong, ma_phong, ma_kh, ngay_dat, gio_bat_dau, gio_ket_thuc, tien_dat_coc, trang_thai) 
VALUES ('DP0001','P0001', 'KH0002', '2018/03/26', '11:00', '13:30', 100000, 'Da dat');
INSERT INTO dat_phong (ma_dat_phong, ma_phong, ma_kh, ngay_dat, gio_bat_dau, gio_ket_thuc, tien_dat_coc, trang_thai) 
VALUES ('DP0002','P0001', 'KH0003', '2018/03/27', '17:15', '19:15', 50000, 'Da huy');
INSERT INTO dat_phong (ma_dat_phong, ma_phong, ma_kh, ngay_dat, gio_bat_dau, gio_ket_thuc, tien_dat_coc,  trang_thai) 
VALUES ('DP0003','P0002', 'KH0002', '2018/03/26', '20:30', '22:15', 100000, 'Da dat');
INSERT INTO dat_phong (ma_dat_phong, ma_phong, ma_kh, ngay_dat, gio_bat_dau, gio_ket_thuc, tien_dat_coc,  trang_thai) 
VALUES ('DP0004','P0003', 'KH0001', '2018/04/01', '19:30', '21:15', 200000, 'Da dat');


INSERT INTO chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dich_vu, so_luong) VALUES ('DP0001', 'DV001', 20);
INSERT INTO chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dich_vu, so_luong) VALUES ('DP0001', 'DV003', 3);
INSERT INTO chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dich_vu, so_luong) VALUES ('DP0001', 'DV002', 10);
INSERT INTO chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dich_vu, so_luong) VALUES ('DP0002', 'DV002', 10);
INSERT INTO chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dich_vu, so_luong) VALUES ('DP0002', 'DV003', 1);
INSERT INTO chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dich_vu, so_luong) VALUES ('DP0003', 'DV003', 2);
INSERT INTO chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dich_vu, so_luong) VALUES ('DP0003', 'DV004', 10)


-- Câu 1: Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, TongTienThanhToan 
-- tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. Những đơn đặt phòng nào không sử dụng dịch vụ đi kèm thì cũng liệt kê 
-- thông tin của đơn đặt phòng đó ra


SELECT dat_phong.ma_dat_phong, dat_phong.ma_phong, phong.loai_phong, khach_hang.ten_kh,
dat_phong.ngay_dat,
ROUND (phong.gia_phong * (EXTRACT(EPOCH FROM (dat_phong.gio_ket_thuc - dat_phong.gio_bat_dau)) / 3600),2) AS tong_tien_hat,
COALESCE(SUM(dich_vu_di_kem.don_gia * chi_tiet_su_dung_dich_vu.so_luong),0) AS tong_tien_dich_vu,
(ROUND (phong.gia_phong * (EXTRACT(EPOCH FROM (dat_phong.gio_ket_thuc - dat_phong.gio_bat_dau)) / 3600),2) + 
COALESCE(SUM(dich_vu_di_kem.don_gia * chi_tiet_su_dung_dich_vu.so_luong),0)) AS tong_tien_thanh_toan

FROM dat_phong
INNER JOIN phong ON dat_phong.ma_phong = phong.ma_phong
INNER JOIN khach_hang ON dat_phong.ma_kh = khach_hang.ma_kh
LEFT JOIN chi_tiet_su_dung_dich_vu ON dat_phong.ma_dat_phong = chi_tiet_su_dung_dich_vu.ma_dat_phong
LEFT JOIN dich_vu_di_kem ON dich_vu_di_kem.ma_dv = chi_tiet_su_dung_dich_vu.ma_dv
GROUP BY dat_phong.ma_dat_phong, phong.ma_phong,
phong.loai_phong,khach_hang.ten_kh



-- Câu 2: Hiển thị MaKH, TenKH, DiaChi, SoDT 
-- của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”

SELECT khach_hang.*
FROM khach_hang
INNER JOIN dat_phong ON khach_hang.ma_kh = dat_phong.ma_kh
WHERE khach_hang.dia_chi = 'Hoa xuan'


-- Câu 3: Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat 
-- của những phòng được khách hàng đặt có số lần đặt lớn hơn 2 lần và trạng thái đặt là “Da dat”

SELECT 
    phong.ma_phong, 
    phong.loai_phong, 
    phong.so_khach_toi_da,
    phong.gia_phong, 
    COUNT(dat_phong.ma_dat_phong) AS so_lan_dat
FROM 
    phong
INNER JOIN 
    dat_phong ON phong.ma_phong = dat_phong.ma_phong
WHERE 
    dat_phong.trang_thai = 'Da dat'
GROUP BY 
    phong.ma_phong, 
    phong.loai_phong, 
    phong.so_khach_toi_da,
    phong.gia_phong
HAVING 
    COUNT(dat_phong.ma_dat_phong) > 2;


-- Câu 4: Hiển thị TenKH của những khách hàng có tên bắt đầu là một trong các ký tự 
-- “H”, “N”, “M” và có độ dài tối đa là 20 ký tự


SELECT ten_kh
FROM khach_hang
WHERE (ten_kh LIKE 'H%' OR ten_kh LIKE 'N%' OR ten_kh LIKE 'M%')
  AND LENGTH(ten_kh) <= 20;

-- Câu 5: Hiển thị TenKH của tất cả các khách hàng có trong hệ thống, TenKH nào trùng nhau thì chỉ hiển thị một lần
SELECT DISTINCT ten_kh
FROM khach_hang;

-- Câu 6: Hiển thị MaDV, TenDV, DonViTinh, DonGia của những dịch vụ đi kèm có DonViTinh là “lon” 
-- và có DonGia lớn hơn 10,000 VNĐ hoặc những dịch vụ đi kèm có DonViTinh là “Cai” và có DonGia nhỏ hơn 5,000 VNĐ

SELECT * FROM dich_vu_di_kem
WHERE (don_vi_tinh ILIKE 'lon' AND don_gia > 10000 ) 
OR (don_vi_tinh ILIKE 'cai' AND don_gia < 5000);


-- Câu 7: Hiển thị MaDatPhong, MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, MaKH, TenKH, SoDT, NgayDat, 
-- GioBatDau, GioKetThuc, MaDichVu, SoLuong, DonGia của những đơn đặt phòng có năm đặt phòng là “2016”, “2017” 
-- và đặt những phòng có giá phòng > 50,000 VNĐ/ 1 giờ


SELECT dat_phong.ma_dat_phong, phong.ma_phong,
phong.loai_phong, phong.so_khach_toi_da, 
phong.gia_phong, khach_hang.ma_kh, 
khach_hang.ten_kh, khach_hang.so_dt, 
dat_phong.ngay_dat, dat_phong.gio_bat_dau, dat_phong.gio_ket_thuc,
dich_vu_di_kem.ma_dv, chi_tiet_su_dung_dich_vu.so_luong,
dich_vu_di_kem.don_gia
FROM dat_phong 
INNER JOIN phong ON phong.ma_phong = dat_phong.ma_phong
INNER JOIN khach_hang ON khach_hang.ma_kh = dat_phong.ma_kh
INNER JOIN chi_tiet_su_dung_dich_vu ON chi_tiet_su_dung_dich_vu.ma_dat_phong = dat_phong.ma_dat_phong
INNER JOIN dich_vu_di_kem ON dich_vu_di_kem.ma_dv = chi_tiet_su_dung_dich_vu.ma_dv
WHERE 
    EXTRACT(YEAR FROM dat_phong.ngay_dat) IN (2016, 2017)
    AND phong.gia_phong > 50000;
 

