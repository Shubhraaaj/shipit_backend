----------------------------- CREATE TABLE AUTH -----------------------------

drop table if exists auths;  

CREATE TABLE auths (
    id uuid DEFAULT uuid_generate_v4(),
    user_email CHARACTER VARYING(50) NOT NULL,
    auth_token TEXT NOT NULL,
    is_active BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(id),
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

ALTER TABLE auths OWNER TO postgres;