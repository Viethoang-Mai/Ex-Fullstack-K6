PGDMP          
            |            day-54    16.4    16.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16662    day-54    DATABASE     �   CREATE DATABASE "day-54" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "day-54";
                postgres    false            �            1259    16691    chi_tiet_su_dung_dich_vu    TABLE     �   CREATE TABLE public.chi_tiet_su_dung_dich_vu (
    ma_dat_phong character varying NOT NULL,
    ma_dv character varying NOT NULL,
    so_luong integer NOT NULL
);
 ,   DROP TABLE public.chi_tiet_su_dung_dich_vu;
       public         heap    postgres    false            �            1259    16678 	   dat_phong    TABLE     �  CREATE TABLE public.dat_phong (
    ma_dat_phong character varying(20) NOT NULL,
    ma_phong character varying NOT NULL,
    ma_kh character varying NOT NULL,
    ngay_dat date NOT NULL,
    gio_bat_dau time without time zone NOT NULL,
    gio_ket_thuc time without time zone NOT NULL,
    tien_dat_coc integer NOT NULL,
    ghi_chu character varying(100),
    trang_thai character(50) NOT NULL
);
    DROP TABLE public.dat_phong;
       public         heap    postgres    false            �            1259    16673    dich_vu_di_kem    TABLE     �   CREATE TABLE public.dich_vu_di_kem (
    ma_dv character varying(20) NOT NULL,
    ten_dv character varying(50) NOT NULL,
    don_vi_tinh character varying(20) NOT NULL,
    don_gia integer NOT NULL
);
 "   DROP TABLE public.dich_vu_di_kem;
       public         heap    postgres    false            �            1259    16668 
   khach_hang    TABLE     �   CREATE TABLE public.khach_hang (
    ma_kh character varying(50) NOT NULL,
    ten_kh character varying(100) NOT NULL,
    dia_chi character varying(150) NOT NULL,
    so_dt numeric(22,0) NOT NULL
);
    DROP TABLE public.khach_hang;
       public         heap    postgres    false            �            1259    16663    phong    TABLE     �   CREATE TABLE public.phong (
    ma_phong character varying(50) NOT NULL,
    loai_phong character varying(50) NOT NULL,
    so_khach_toi_da integer NOT NULL,
    gia_phong numeric(10,2) NOT NULL,
    mo_ta character varying(200)
);
    DROP TABLE public.phong;
       public         heap    postgres    false                       0    16691    chi_tiet_su_dung_dich_vu 
   TABLE DATA           Q   COPY public.chi_tiet_su_dung_dich_vu (ma_dat_phong, ma_dv, so_luong) FROM stdin;
    public          postgres    false    219   �       �          0    16678 	   dat_phong 
   TABLE DATA           �   COPY public.dat_phong (ma_dat_phong, ma_phong, ma_kh, ngay_dat, gio_bat_dau, gio_ket_thuc, tien_dat_coc, ghi_chu, trang_thai) FROM stdin;
    public          postgres    false    218   ?       �          0    16673    dich_vu_di_kem 
   TABLE DATA           M   COPY public.dich_vu_di_kem (ma_dv, ten_dv, don_vi_tinh, don_gia) FROM stdin;
    public          postgres    false    217   �       �          0    16668 
   khach_hang 
   TABLE DATA           C   COPY public.khach_hang (ma_kh, ten_kh, dia_chi, so_dt) FROM stdin;
    public          postgres    false    216   B       �          0    16663    phong 
   TABLE DATA           X   COPY public.phong (ma_phong, loai_phong, so_khach_toi_da, gia_phong, mo_ta) FROM stdin;
    public          postgres    false    215   �       h           2606    16697 6   chi_tiet_su_dung_dich_vu CHI_TIET_DU_DUNG_DICH_VU_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_su_dung_dich_vu
    ADD CONSTRAINT "CHI_TIET_DU_DUNG_DICH_VU_pkey" PRIMARY KEY (ma_dat_phong, ma_dv);
 b   ALTER TABLE ONLY public.chi_tiet_su_dung_dich_vu DROP CONSTRAINT "CHI_TIET_DU_DUNG_DICH_VU_pkey";
       public            postgres    false    219    219            f           2606    16685    dat_phong DAT_PHONG_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.dat_phong
    ADD CONSTRAINT "DAT_PHONG_pkey" PRIMARY KEY (ma_dat_phong);
 D   ALTER TABLE ONLY public.dat_phong DROP CONSTRAINT "DAT_PHONG_pkey";
       public            postgres    false    218            d           2606    16677 "   dich_vu_di_kem DICH_VU_DI_KEM_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.dich_vu_di_kem
    ADD CONSTRAINT "DICH_VU_DI_KEM_pkey" PRIMARY KEY (ma_dv);
 N   ALTER TABLE ONLY public.dich_vu_di_kem DROP CONSTRAINT "DICH_VU_DI_KEM_pkey";
       public            postgres    false    217            b           2606    16672    khach_hang KHACH_HANG_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.khach_hang
    ADD CONSTRAINT "KHACH_HANG_pkey" PRIMARY KEY (ma_kh);
 F   ALTER TABLE ONLY public.khach_hang DROP CONSTRAINT "KHACH_HANG_pkey";
       public            postgres    false    216            `           2606    16667    phong PHONG_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.phong
    ADD CONSTRAINT "PHONG_pkey" PRIMARY KEY (ma_phong);
 <   ALTER TABLE ONLY public.phong DROP CONSTRAINT "PHONG_pkey";
       public            postgres    false    215            i           2606    16708    dat_phong MaKH_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.dat_phong
    ADD CONSTRAINT "MaKH_foreign" FOREIGN KEY (ma_kh) REFERENCES public.khach_hang(ma_kh) NOT VALID;
 B   ALTER TABLE ONLY public.dat_phong DROP CONSTRAINT "MaKH_foreign";
       public          postgres    false    218    4706    216            j           2606    16686    dat_phong MaPhong_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.dat_phong
    ADD CONSTRAINT "MaPhong_foreign" FOREIGN KEY (ma_phong) REFERENCES public.phong(ma_phong);
 E   ALTER TABLE ONLY public.dat_phong DROP CONSTRAINT "MaPhong_foreign";
       public          postgres    false    218    215    4704            k           2606    16714 -   chi_tiet_su_dung_dich_vu ma_dat_phong_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_su_dung_dich_vu
    ADD CONSTRAINT ma_dat_phong_foreign FOREIGN KEY (ma_dat_phong) REFERENCES public.dat_phong(ma_dat_phong) NOT VALID;
 W   ALTER TABLE ONLY public.chi_tiet_su_dung_dich_vu DROP CONSTRAINT ma_dat_phong_foreign;
       public          postgres    false    219    4710    218            l           2606    16719 &   chi_tiet_su_dung_dich_vu ma_dv_foreign    FK CONSTRAINT     �   ALTER TABLE ONLY public.chi_tiet_su_dung_dich_vu
    ADD CONSTRAINT ma_dv_foreign FOREIGN KEY (ma_dv) REFERENCES public.dich_vu_di_kem(ma_dv) NOT VALID;
 P   ALTER TABLE ONLY public.chi_tiet_su_dung_dich_vu DROP CONSTRAINT ma_dv_foreign;
       public          postgres    false    219    217    4708                7   x�s	0000�t	�F\.�1�12׈�*m��o�i�C�F�\��=... �q      �   �   x���1�0��9H�o)�3T��8 R��z�&�V��oO�ibf�����z�q��^��rd&���p�GJK�Z>͉q�8-�f�`Z�sİi0M.k�u�݂u�P+��׻�QӢ�U��=p�����w
�oι?kJ�      �   W   x�s	300�tJM-�����44 .���_i~�B^z~	X�&a�R�����Xə���il
�0���H�S(jHN��4���qqq !      �   Y   x���0000��K/�L�SK�Sp���OT�(M��4�.o�:#duN`u��eFeƜ�0ÜsrRj�!jLj��Xh����� ��')      �   E   x�0000���O�T0�42�4��8c���L#��)���1DΈ�Д�M�"g2Y.F��� ��O     