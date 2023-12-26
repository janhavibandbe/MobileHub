create table mobiles(
    id int primary key auto_increment,
    model varchar(20) not null,
    company varchar(20) not null,
    RAM int not null,
    storage int not null,
    battery_mAh int not null,
    camera_MP int not null,
    price float not null
);