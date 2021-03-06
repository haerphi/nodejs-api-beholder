-- -------------------------------------------------------------
-- TablePlus 2.10.2(272)
--
-- https://tableplus.com/
--
-- Database: beholder
-- Generation Time: 2019-11-08 16:14:40.0640
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."character";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS character_id_seq;

-- Table Definition
CREATE TABLE "public"."character" (
    "id" int4 NOT NULL DEFAULT nextval('character_id_seq'::regclass),
    "property" json,
    "status" varchar,
    "idGame" int4,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."character_sheet";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS character_sheet_id_seq;

-- Table Definition
CREATE TABLE "public"."character_sheet" (
    "id" int4 NOT NULL DEFAULT nextval('character_sheet_id_seq'::regclass),
    "property" json,
    "idUniverse" int4,
    PRIMARY KEY ("id")
);

DROP TABLE IF EXISTS "public"."game";
-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS game_id_seq;

-- Table Definition
CREATE TABLE "public"."game" (
    "id" int4 NOT NULL DEFAULT nextval('game_id_seq'::regclass),
    "idUser" int4,
    "name" varchar,
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

INSERT INTO "public"."character" ("id", "property", "status", "idGame") VALUES ('1', '{"name":"potato","feculent":100,"glucide":10,"puissance":9999}', 'pc', '5'),
('2', '{"name":"truc","feculent":0,"glucide":1,"puissance":-1}', 'npc', '5'),
('3', '{"name":"machin","feculent":0,"glucide":1,"puissance":-1}', 'pc', '5');

INSERT INTO "public"."character_sheet" ("id", "property", "idUniverse") VALUES ('1', '{"feculent":0,"glucide":0,"puissance":0}', '1');

INSERT INTO "public"."game" ("id", "idUser", "name", "idUniverse") VALUES ('1', '2', 'Potato''s game', '1'),
('5', '3', 'plow''s game', '1');

INSERT INTO "public"."universe" ("id", "name", "theme") VALUES ('1', 'Potatoes world', 'classic');

INSERT INTO "public"."user" ("id", "email", "password", "nickname", "firstname", "lastname") VALUES ('2', 'potato', '$2a$10$gojX3rv7npRn.QuYqKxSdeEFQYDV7VJe5ceZtKJSicuRhxh1GDsfa', 'potato', NULL, NULL),
('3', 'plow', '$2a$10$yyMcCcA6vKUcNhAG6ByVbupUrzz9UJLGqXJALOsOLjlgP1rOSslw.', 'plow', NULL, NULL);

INSERT INTO "public"."user_x_user" ("idUser1", "idUser2", "accepted") VALUES ('2', '3', 't');


