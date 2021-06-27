drop database text_share_project;

create database text_share_project;

use text_share_project;

create table app_language (
language_name varchar(255) not null primary key,
language_id int not null
);

insert into app_language values
("Chinese", 1),
("English", 2),
("French", 3),
("Spanish", 4),
("Japanese", 5);

create table project_user (
user_id int primary key not null auto_increment,
user_name varchar(255) not null,
user_password varchar(4) not null,
first_name varchar(255) not null,
last_name varchar(255) not null,
age int not null,
country varchar(255) not null,
default_language varchar(255) not null,
key project_user_fk (default_language),
constraint project_user_fk foreign key (default_language) references app_language (language_name) on delete cascade on update cascade
);

insert into project_user values
(1, "user1", '1111',"John", "A", 16, "America", "English"),
(2, "user2", '2222', "Alice", "B", 25, "America", "English"),
(3, "user3", 'qwer', "Yan", "Yang", 21, "China", "Chinese"),
(4, "user4", '2345', "Louise", "Martin", 30, "France", "French"),
(5, "user5", '56qw', "Carla", "Garcia", 27, "Spain", "Spanish");

create table genre (
genre_name varchar(255) not null primary key,
genre_id int not null
);

insert into genre values 
("novel", 1),
("research paper", 2),
("news", 3),
("published book", 4),
("journal", 5);

create table text (
text_id int primary key not null auto_increment,
text_name varchar(255) not null,
text_description text not null,
text_content text not null,
text_genre varchar(255) not null,
text_language varchar(255) not null,
key text_fk1 (text_genre),
key text_fk2 (text_language),
constraint text_fk1 foreign key (text_genre) references genre (genre_name) on delete cascade on update cascade,
constraint text_fk2 foreign key (text_language) references app_language (language_name) on delete cascade on update cascade
);

insert into text values
(1, "Life needs warm and light", "overcome the difficultis in the life", "Should have some Chinese characters here", "published book", "Chinese"),
(2, "The Body Firm", "a novel about forensic", "how to improve her technque ...", "novel", "English"),
(3, "Big Data", "a research paper about data science", "After developing in the past decades, ...", "research paper", "French"),
(4, "EllE", "a magazine about fashion", "the wearing trend of this summer is ...", "journal", "Spanish"),
(5, "The Body Firm", "a novel about forensic", "Should have some Chinese characters here", "novel", "Chinese");


create table user_read_history (
history_id int primary key not null auto_increment,
read_time date not null,
user_id int not null,
text_id int not null,
key history_fk1 (user_id),
key history_fk2 (text_id),
constraint history_fk1 foreign key (user_id) references project_user (user_id) on delete cascade on update cascade,
constraint history_fk2 foreign key (text_id) references text (text_id) on delete cascade on update cascade
);

insert into user_read_history values
(1, '2020-9-1', 1, 2), (2, '2021-1-1', 1, 3), 
(3, '2021-3-21', 3, 1), (4, '2021-4-3', 3, 4);


create table administrator (
ad_id int primary key not null,
ad_password varchar(4) not null,
ad_name varchar(255) not null,
ad_country varchar(255) not null,
ad_home_language varchar(255) not null,
work_period varchar(255) not null,
key ad_fk1 (ad_home_language),
constraint ad_fk1 foreign key (ad_home_language) references app_language (language_name) on delete cascade on update cascade
);


insert into administrator values
(1, '1234', "Z", "China", "Chinese", "each Monday"),
(2, '1111', "Frank", "America", "English", "each Tuesday"); 

create table download (
download_id int primary key not null auto_increment,
download_time date not null,
user_id int not null,
text_id int not null,
key download_fk1 (user_id),
key download_fk2 (text_id),
constraint download_fk1 foreign key (user_id) references project_user (user_id) on delete cascade on update cascade,
constraint download_fk2 foreign key (text_id) references text (text_id) on delete cascade on update cascade
);

insert into download values
(1, '2021-03-15', 1, 1),
(2, '2021-04-01', 5, 3);

create table delete_text (
text_id int not null primary key,
text_name varchar(255),
ad_id int,
delete_time date,
delete_reason text,
key delete_text_fk1 (ad_id),
constraint delete_text_fk1 foreign key (ad_id) references administrator (ad_id) on delete cascade on update cascade
);

DELIMITER $$
create procedure find_text (in book varchar(255))
begin
select text_id, text_name, text_description, 
text_genre, text_language from text where text_name = book;

end $$
DELIMITER ;

/*
call find_text("The Body Firm");
*/

delimiter $$
create procedure find_text_content (in book_id int)
begin
select text_content from text where text_id = book_id;

end $$
delimiter ;

/*
call find_text_context(5);
*/

delimiter $$
create procedure find_user_password (in input_user_id int)
begin
select user_password from project_user where user_id = input_user_id;

end $$
delimiter ;

/*
call find_user_password(2);
*/

delimiter $$
create procedure insert_text (text_name varchar(255), des varchar(255), content text, genre varchar(255), lan varchar(255))
begin
insert into text (text_name, text_description, text_content, text_genre, text_language) values
(text_name, des, content, genre, lan);

end $$
delimiter ;

/*
call insert_text ('love', 'text', 'test', 'novel', 'English');
*/
 
delimiter $$
create procedure update_download(in input_dowmload_time date, user_id int, text_id int)
begin
insert into download (download_time, user_id, text_id) values
(input_dowmload_time, user_id, text_id);
 
end $$
delimiter ;

/*
call update_download('2020-03-01', 2, 5);
*/

delimiter $$
create procedure download_receipt(in in_download_time date, input_user_id int, input_text_id int)
begin
select d.download_id, d.download_time, d.user_id, p_user.user_name, 
d.text_id, text.text_name from
(select text_id, text_name from text where text_id = input_text_id)
as text,
(select user_id, user_name from project_user where user_id = input_user_id)
as p_user,
(select * from download where user_id = input_user_id and text_id = input_text_id
and download_time = in_download_time) as d
where text.text_id = d.text_id and p_user.user_id = d.user_id;
end $$
delimiter ;

/*
call download_receipt('2021-4-21', 1, 5);
*/

delimiter $$
create procedure update_history(in input_read_time date, user_id int, text_id int)
begin
insert into user_read_history (read_time, user_id, text_id) values
(input_read_time, user_id, text_id);
 
end $$
delimiter ;
/*
call update_history('2021-4-20', 1, 3);
*/

delimiter $$
create procedure user_reading_history(in input_user_id int)
begin
select h.history_id, h.read_time, h.user_id, p_user.user_name, 
h.text_id, text.text_name from
(select text_id, text_name from text) as text,
(select user_id, user_name from project_user) as p_user,
(select * from user_read_history where user_id = input_user_id) as h
where text.text_id = h.text_id and p_user.user_id = h.user_id;
end $$
delimiter ;
/*
call user_reading_history(1);
*/

delimiter $$
create procedure create_user(in userName varchar(255), userPass varchar(4), fName varchar(255),
LName varchar(255), user_age int, con varchar(255), lan varchar(255))
begin
insert into project_user (user_name, user_password, first_name, last_name, age, country, default_language) values
(userName, userPass, fName, LName, user_age, con, lan);
 
end $$
delimiter ;
/*
call create_user('user6', '6666', 'Alex', 'Brown', 18, 'England', 'English');
*/

delimiter $$
create trigger delete_text_history after delete on text
For each row
begin
insert into delete_text (text_id, text_name) values
(OLD.text_id, OLD.text_name);

end $$
delimiter ;

/*
call insert_text ('love', 'text', 'test', 'novel', 'English');

select * from delete_text;
select * from text;

delete from text where text_id > 5;
*/


delimiter $$
create procedure update_delete_reason (input_text_id int, input_ad_id int, input_time date, reason text)
begin 
update delete_text
set ad_id = input_ad_id, delete_time = input_time, delete_reason = reason
where text_id = input_text_id;
end $$
delimiter ;

delimiter $$
create function after_changeing_work_period (id int)
returns varchar(255)
deterministic
contains sql
begin
declare period varchar(255);
select work_period into period from administrator
where ad_id = id;

return (period);
end $$
delimiter ;
/*
select after_changeing_work_period(1) as changed_work_period;
*/











