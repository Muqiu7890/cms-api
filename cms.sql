-- ���ݹ���ϵͳ
CREATE DATABASE IF NOT EXISTS cms;

use cms;

-- �û���
CREATE TABLE users(
id INT PRIMARY KEY auto_increment,
username VARCHAR(50) NOT NULL,  -- �û���
password VARCHAR(50) NOT NULL, -- ����
email VARCHAR(50) NOT NULL, -- ����
nickname VARCHAR(50) NOT NULL,
avatar VARCHAR(50) NOT NULL, -- ͷ��
gender bit NULL, -- �Ա�
create_time DATE NOT NULL, -- ����ʱ��
modify_time DATE NOT NULL -- �޸�ʱ��
);

-- �����
CREATE TABLE topics(
id INT PRIMARY KEY auto_increment,
title VARCHAR(100) NOT NULL,  -- ����
content TEXT NOT NULL, -- ����
user_id INT NOT NULL, -- �����û�
create_time DATE NOT NULL, -- ����ʱ��
modify_time DATE NOT NULL -- ���ʱ��
);

-- ���۱�
CREATE TABLE comments(
id INT PRIMARY KEY auto_increment,
content TEXT NOT NULL, -- ��������
create_time DATE NOT NULL, -- ����ʱ��
modify_time DATE NOT NULL, -- ���ʱ��
article_id INT NOT NULL, -- ��������
user_id INT NOT NULL, -- �����û�
reply_id INT NOT NULL -- �����ظ���
);




