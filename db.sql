drop database if exists todo;
create database todo;
use todo;
create table task (
    id int auto_increment,
    description varchar(255) not null
);
insert into task (description) values ('Do the dishes');
insert into task (description) values ('Do the laundry');