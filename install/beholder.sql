-- -------------------------------------------------------------
-- TablePlus 2.10.2(272)
--
-- https://tableplus.com/
--
-- Database: beholder
-- Generation Time: 2019-11-07 15:54:53.8460
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."caracter_sheet";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS caracter_sheet_id_seq;

-- Table Definition
CREATE TABLE "public"."caracter_sheet" (
    "id" int4 NOT NULL DEFAULT nextval('caracter_sheet_id_seq'::regclass),
    "property" json,
    "idUniverse" int4,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."universe";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS universe_id_seq;

-- Table Definition
CREATE TABLE "public"."universe" (
    "id" int4 NOT NULL DEFAULT nextval('universe_id_seq'::regclass),
    "name" varchar,
    "theme" varchar DEFAULT 'classic'::character varying,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."user";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS user_id_seq;

-- Table Definition
CREATE TABLE "public"."user" (
    "id" int4 NOT NULL DEFAULT nextval('user_id_seq'::regclass),
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "nickname" varchar NOT NULL,
    "firstname" varchar,
    "lastname" varchar,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."user_x_user";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."user_x_user" (
    "idUser1" int4 NOT NULL,
    "idUser2" int4 NOT NULL,
    "accepted" bool DEFAULT false
);

INSERT INTO "public"."universe" ("id", "name", "theme") VALUES ('1', 'Potatoes world', 'classic');

INSERT INTO "public"."user" ("id", "email", "password", "nickname", "firstname", "lastname") VALUES ('2', 'potato', '$2a$10$gojX3rv7npRn.QuYqKxSdeEFQYDV7VJe5ceZtKJSicuRhxh1GDsfa', 'potato', NULL, NULL),
('3', 'plow', '$2a$10$yyMcCcA6vKUcNhAG6ByVbupUrzz9UJLGqXJALOsOLjlgP1rOSslw.', 'plow', NULL, NULL);

INSERT INTO "public"."user_x_user" ("idUser1", "idUser2", "accepted") VALUES ('2', '3', 't');


