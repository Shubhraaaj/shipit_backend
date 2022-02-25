------------------------CREATE TABLE `Tariff_CHART`--------------------
drop table if exists tariff_chart; 

CREATE TABLE tariff_chart (
    id uuid DEFAULT uuid_generate_v4(),
    tariff JSON NOT NULL,
    vendor_id uuid NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    PRIMARY KEY(id),
    CONSTRAINT fk_vendor
      FOREIGN KEY(vendor_id) 
	  REFERENCES vendors(vendor_id)
	  ON DELETE CASCADE
  
);

ALTER TABLE tariff_chart OWNER TO postgres;