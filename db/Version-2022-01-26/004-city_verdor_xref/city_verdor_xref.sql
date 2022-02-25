----------------------------- CREATE TABLE AUTH -----------------------------

drop table if exists city_vendor_xref; 

CREATE TABLE city_vendor_xref (
    id uuid DEFAULT uuid_generate_v4(),
    destination_city CHARACTER VARYING(50) NOT NULL,
    vendor_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(), 
    PRIMARY KEY(id),
    CONSTRAINT fk_vendor
      FOREIGN KEY(vendor_id) 
	  REFERENCES vendors(vendor_id)
	  ON DELETE CASCADE
);

ALTER TABLE city_vendor_xref OWNER TO postgres;

