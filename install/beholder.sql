-- -------------------------------------------------------------
-- TablePlus 2.10.2(272)
--
-- https://tableplus.com/
--
-- Database: beholder
-- Generation Time: 2019-11-07 14:42:32.8830
-- -------------------------------------------------------------


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

INSERT INTO "public"."user" ("id", "email", "password", "nickname", "firstname", "lastname") VALUES ('2', 'potato', '$2a$10$gojX3rv7npRn.QuYqKxSdeEFQYDV7VJe5ceZtKJSicuRhxh1GDsfa', 'potato', NULL, NULL),
('3', 'plow', '$2a$10$yyMcCcA6vKUcNhAG6ByVbupUrzz9UJLGqXJALOsOLjlgP1rOSslw.', 'plow', NULL, NULL);

INSERT INTO "public"."user_x_user" ("idUser1", "idUser2", "accepted") VALUES ('2', '3', 't');


