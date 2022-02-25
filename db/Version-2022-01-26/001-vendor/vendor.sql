------------------------CREATE TABLE `Vendor`--------------------
drop table if exists vendor; 

CREATE TABLE vendor (
    vendor_id uuid DEFAULT uuid_generate_v4(),
    name CHARACTER VARYING(50) NOT NULL,
    email CHARACTER VARYING(50) NOT NULL,
    phone_number CHARACTER VARYING(15) NOT NULL,
    service_cities TEXT [],
    tariff_chart_id CHARACTER VARYING(50) DEFAULT NULL,
    logo CHARACTER VARYING(100) DEFAULT NULL,
    password CHARACTER VARYING(250) NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY(vendor_id)
);

ALTER TABLE vendor OWNER TO postgres;