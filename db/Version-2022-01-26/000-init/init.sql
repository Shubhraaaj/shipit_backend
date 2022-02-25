------------------------ Initial Script --------------------
create type order_t as enum('a', 'b', 'c', 'd');
create type priority_t as enum('high', 'low');
create type order_status_t as enum('ordered','shiped','on transition', 'delievered');