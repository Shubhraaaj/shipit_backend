
------------------------CREATE TABLE `ORDER`--------------------
create type order_t as enum('a', 'b', 'c', 'd');
create type priority_t as enum('high', 'low');
create type order_status_t as enum('ordered','shiped','onTransition', 'delievered');

drop table if exists orders; 

CREATE TABLE orders (
    id uuid PRIMARY KEY NOT NULL,
    order_no CHARACTER VARYING(50) NOT NULL,
    sender JSON NOT NULL,
    receiver JSON NOT NULL,
    order_status order_status_t,
    tracking_id CHARACTER VARYING(50) DEFAULT NULL,
    amount CHARACTER VARYING(20) DEFAULT NULL,
    weight CHARACTER VARYING(20) DEFAULT NULL,
    type order_t,
    priority priority_t,
    weight_unit CHARACTER VARYING(10) DEFAULT NULL,
    destination_city CHARACTER VARYING(50) NOT NULL,
    source_city CHARACTER VARYING(50) NOT NULL,
    vendor_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(), 
    CONSTRAINT fk_vendor
      FOREIGN KEY(vendor_id) 
	  REFERENCES vendors(vendor_id)
	  ON DELETE CASCADE
 
);

ALTER TABLE orders OWNER TO postgres;