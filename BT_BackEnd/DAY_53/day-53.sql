-- Create database
CREATE DATABASE database_02_viethoangmai



CREATE TABLE IF NOT EXISTS customers(
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
   status BOOLEAN DEFAULT TRUE NOT NULL,
    created_at  TIMESTAMP with TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at  TIMESTAMP with TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE TABLE IF NOT EXISTS products(
    id INT NOT NULL PRIMARY KEY,
    quantity INT NOT NULL,
    price REAL NOT NULL,
    created_at  TIMESTAMP with TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at  TIMESTAMP with TIME ZONE DEFAULT NOW() NOT NULL

);

ALTER TABLE courses ADD COLUMN description TEXT;


--Đổi tên trường detail thành content

ALTER TABLE courses RENAME COLUMN detail TO content;

-- ràng buộc chuyển thành NOT NULL

ALTER TABLE courses ALTER COLUMN content SET NOT NULL;
/*
Tạo bảng teacher có cấu trúc như sau:
    id => Kiểu int, NOT NULL
    name => Kiểu varchar, NOT NULL
    bio => Kiểu text, NULL
    created_at => Kiểu timestamp
    updated_at => Kiểu timestamp
*/
CREATE TABLE teacher(
    id INT NOT NULL,
	name varchar(50) NOT NULL,
	bio TEXT,
	created_at TIMESTAMP with TIME ZONE ,
	updated_at TIMESTAMP with TIME ZONE
);

--Thêm 3 giảng viên vào bảng teacher, mỗi giảng viên thêm 3 khóa học:

INSERT INTO teacher(id , name , bio , created_at, updated_at)
VALUES
(1, 'Teacher 1', 'Bios Teacher 1', NOW() ,NOW()),
(2, 'Teacher 2', 'Bios Teacher 2', NOW() , NOW()),
(3, 'Teacher 3', 'Bios Teacher 3', NOW() , NOW());

-- mỗi giảng viên thêm 3 khóa học:

INSERT INTO courses(id, name , price,description, content,teacher_id, active,created_at,updated_at) 
VALUES  
(1, 'Course 1', 100000, 'description 1',' content 1', 1, 1, NOW(), NOW()),
(2, 'Course 2', 200000, 'description 2',' content 2', 1, 0, NOW(), NOW()),
(3, 'Course 3', 300000, 'description 3',' content 3', 1, 1, NOW(), NOW()),
(4, 'Course 4', 400000, 'description 4',' content 4', 2, 1, NOW(), NOW()),
(5, 'Course 5', 500000, 'description 5',' content 5', 2, 0, NOW(), NOW()),
(6, 'Course 6', 600000, 'description 6',' content 6', 2, 0, NOW(), NOW()),
(7, 'Course 7', 700000, 'description 7',' content 7', 3, 1, NOW(), NOW()),
(8, 'Course 8', 900000, 'description 8',' content 8', 3, 1, NOW(), NOW()),
(9, 'Course 9', 900000, 'description 9',' content 9', 3, 0, NOW(), NOW());

-- Sửa tên và giá từng khóa học thành tên mới và giá mới, Tên khóa học, giá khóa học các khóa học không được giống nhau

ALTER TABLE courses
ADD CONSTRAINT courses_name_price_unique UNIQUE (name, price);

UPDATE courses SET name='Course 1 Updated', price=90000, updated_at=NOW() WHERE id = 1;
UPDATE courses SET name='Course 2 Updated', price=80000, updated_at=NOW() WHERE id = 2;
UPDATE courses SET name='Course 3 Updated', price=70000, updated_at=NOW() WHERE id = 3;
UPDATE courses SET name='Course 4 Updated', price=60000, updated_at=NOW() WHERE id = 4;
UPDATE courses SET name='Course 5 Updated', price=50005, updated_at=NOW() WHERE id = 5;
UPDATE courses SET name='Course 6 Updated', price=40000, updated_at=NOW() WHERE id = 6;
UPDATE courses SET name='Course 7 Updated', price=30000, updated_at=NOW() WHERE id = 7;
UPDATE courses SET name='Course 8 Updated', price=20000, updated_at=NOW() WHERE id = 8;
UPDATE courses SET name='Course 9 Updated', price=10000, updated_at=NOW() WHERE id = 9;
	   
-- Sửa lại bio của từng giảng viên (Bio từng giảng viên không được giống nhau)

ALTER TABLE teacher
ADD CONSTRAINT teacher_bio_unique UNIQUE (bio);

UPDATE teacher SET bio='Bios Teacher 1 Updated', updated_at=NOW() WHERE id = 1;
UPDATE teacher SET bio='Bios Teacher 2 Updated', updated_at=NOW() WHERE id = 2;
UPDATE teacher SET bio='Bios Teacher 3 Updated', updated_at=NOW() WHERE id = 3;

-- Hiển thị danh sách giảng viên
SELECT * FROM teacher;

-- Hiển thị danh sách khóa học
SELECT * FROM courses;