--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: email; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.email OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.migrations_lock OWNER TO postgres;

--
-- Name: migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_lock_index_seq OWNER TO postgres;

--
-- Name: migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_lock_index_seq OWNED BY public.migrations_lock.index;


--
-- Name: requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    server_id uuid,
    response_time integer NOT NULL,
    status_code integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    success boolean DEFAULT true NOT NULL
);


ALTER TABLE public.requests OWNER TO postgres;

--
-- Name: web_servers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.web_servers (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    url character varying(255) NOT NULL,
    status character varying(255) DEFAULT 'unknown'::character varying NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.web_servers OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.migrations_lock_index_seq'::regclass);


--
-- Data for Name: email; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email (id, name, email, created_at, updated_at) FROM stdin;
4730646d-8485-4eed-a4c0-56ab671b2e2a	eli	eli.eliyahu.280@gmail.com	2024-07-16 13:21:22.760344+03	2024-07-16 13:21:22.760344+03
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, name, batch, migration_time) FROM stdin;
3	20240715101752_init.ts	1	2024-07-15 13:24:14.476+03
4	20240715220517_add_success_column_to_requests.ts	2	2024-07-16 01:06:42.737+03
5	20240716015353__add_table_email.ts	3	2024-07-16 10:01:52.021+03
\.


--
-- Data for Name: migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations_lock (index, is_locked) FROM stdin;
1	0
\.


--
-- Data for Name: requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.requests (id, server_id, response_time, status_code, created_at, success) FROM stdin;
4f37c592-5eca-47ab-9240-7424594a539d	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	908	200	2024-07-16 01:25:54.707408+03	t
20e0d0a7-36cd-41bb-9417-79e62c4f68f9	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	844	200	2024-07-16 01:25:55.566801+03	t
c88b13c3-0138-432a-80d0-9091aa4851f2	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	809	200	2024-07-16 01:25:56.380401+03	t
36442758-1d2d-4d9e-8cd6-67d956bd6eec	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	782	200	2024-07-16 01:25:57.166562+03	t
bb966d1e-ffbc-4930-bce8-7f1578070a8b	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	791	200	2024-07-16 01:25:57.961724+03	t
0b1bcf86-329a-4328-91b1-10cdbdcc0010	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	451	200	2024-07-16 01:26:54.149517+03	t
5ff874ac-b4fc-45fa-a6e6-fca1b1def13a	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	464	200	2024-07-16 01:26:54.617455+03	t
3e7e4a82-9520-430c-b7b2-dcbecb66c261	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	350	200	2024-07-16 01:26:54.970401+03	t
39b15a55-43bd-470e-8187-6c80afb740e1	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	330	200	2024-07-16 01:26:55.304197+03	t
cc3058ca-df2e-4485-b0be-4d1586da7f3e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	357	200	2024-07-16 01:26:55.665834+03	t
1e7c729b-e64b-44d3-8ab5-553827bb8750	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	378	200	2024-07-16 01:28:05.361205+03	t
ca238c08-cd3f-4803-b2d9-9d5501c67b4c	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	563	200	2024-07-16 01:28:05.935806+03	t
77bd7eb8-d589-43c3-852c-274988f82a7b	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	395	200	2024-07-16 01:28:06.335048+03	t
4aab64a0-cde5-437b-8c3d-5804d75989fa	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	449	200	2024-07-16 01:28:06.788323+03	t
880ffbf2-87ab-4e62-a14f-3aa5a9d5c24a	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	354	200	2024-07-16 01:28:07.14524+03	t
2ed58edf-6863-4976-9ca0-d662c9b49a7b	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	353	200	2024-07-16 01:29:05.232273+03	t
8fc8407e-cc0a-4492-b0cd-2925a9b43a97	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	354	200	2024-07-16 01:29:05.590758+03	t
2887fbdf-ec83-4f17-b0bd-495ce9ccc920	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	347	200	2024-07-16 01:29:05.940688+03	t
09237bb8-0933-4f6b-a620-c02f18413183	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	352	200	2024-07-16 01:29:06.296938+03	t
400fb7fe-5508-4e38-ad5f-d67d244da81a	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	470	200	2024-07-16 01:29:06.770855+03	t
dbb68ac4-d62b-455b-ada5-74add1f2f451	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	269	200	2024-07-16 02:03:48.400687+03	f
101af96a-e4fa-4826-9d3b-254f6bce382b	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	263	200	2024-07-16 02:03:48.676937+03	f
82224719-4a3a-4aaa-9daa-ce0bb5966a7a	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	274	200	2024-07-16 02:03:48.954375+03	f
93d74229-dfa7-41f7-b899-bf2867874c9b	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	253	200	2024-07-16 02:03:49.211018+03	f
420f22e9-a582-4e05-a9c1-d2ffef5422a2	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	251	200	2024-07-16 02:03:49.466069+03	f
5c046fc8-a670-4aae-aee8-a69694855ceb	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	261	200	2024-07-16 02:29:05.04641+03	t
2edb7a52-56fe-4304-94d0-67ee2186cf5e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	277	200	2024-07-16 02:29:05.3353+03	t
17d594f4-ccbe-4dd9-81c9-3425efbef4fc	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	269	200	2024-07-16 02:29:05.608107+03	t
b87fc4d9-446b-4af5-90d0-370e8a5a317e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	252	200	2024-07-16 02:29:05.863436+03	t
14a373ad-59fd-4c3b-914a-764c49f22e92	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	302	200	2024-07-16 02:29:06.168985+03	t
ab797376-b2cf-40fc-8e3c-9c721f942bde	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	29	500	2024-07-16 09:52:36.640882+03	f
0654d45d-25ff-406f-8ecd-e1b87b74d224	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-16 09:52:36.668675+03	f
1cde035c-7ba9-4df1-aacf-cb56acd30139	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	1	500	2024-07-16 09:52:36.672174+03	f
45e94eb5-0f21-47f1-80e1-20654f34325f	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-16 09:52:36.675703+03	f
ee169fec-7eac-47c6-af51-5daa1af2d62e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	1	500	2024-07-16 09:52:36.679028+03	f
6b1a15bd-6d10-4b80-a3c2-68d654e9e18e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	28	500	2024-07-16 10:42:18.089159+03	f
afac26e4-720b-4ee0-bf01-e5850b5d10fd	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-16 10:42:18.103477+03	f
e854d31d-637e-4ff6-958e-eb788c45940c	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-16 10:42:18.108275+03	f
c0fd9cf1-5bd4-4554-9064-802287422df9	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-16 10:42:18.112282+03	f
5d91cdb0-e940-49be-8dff-afa98afb3586	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-16 10:42:18.115979+03	f
643dbabf-9413-4515-9572-a9363515e39c	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	788	200	2024-07-16 12:47:09.838832+03	t
36b633f6-25fe-4f4b-8e66-fbfb579183b3	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	751	200	2024-07-16 12:47:10.601773+03	t
b2b576ed-cb17-47ed-89b1-e949cbefdf73	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	247	200	2024-07-16 12:47:10.852733+03	t
bf7538ef-4cf5-4505-817b-dc1256ef6059	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	775	200	2024-07-16 12:47:11.630318+03	t
e45c0aca-030e-41f4-a420-35a87533abaa	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	753	200	2024-07-16 12:47:12.386245+03	t
dc085a53-ad46-4937-8c05-333e85435467	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	302	200	2024-07-16 12:50:29.824673+03	t
f28110f3-e59b-4331-a222-59278dee58bb	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	839	200	2024-07-16 12:50:30.674454+03	t
99767319-ea47-4ff2-99d2-d126227919c3	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	766	200	2024-07-16 12:50:31.443633+03	t
fe6032e0-32c3-4c31-b9a5-a24b9bb419ba	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	254	200	2024-07-16 12:50:31.702017+03	t
4f8cbeca-5b9e-4ae1-8708-65bbd45956cf	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	255	200	2024-07-16 12:50:31.959513+03	t
7fa9c0a8-6c93-45d4-9a52-1fa3605650af	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	296	200	2024-07-16 12:52:22.422362+03	t
e6a898f2-968e-449a-a628-641fbe770561	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	254	200	2024-07-16 12:52:22.68556+03	t
0b167270-2b79-4928-9901-5e9a251209e5	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	250	200	2024-07-16 12:52:22.938933+03	t
2a68e872-1403-44f2-b729-3298de649031	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	250	200	2024-07-16 12:52:23.191948+03	t
3fe09a69-79dd-4aa5-8f4b-d831ebd38c58	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	257	200	2024-07-16 12:52:23.451277+03	t
1e55ee28-973e-4c76-8f30-02cbf0572380	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	259	200	2024-07-16 12:54:07.904487+03	t
901e3c68-32f6-40b4-9bda-479159246922	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	288	200	2024-07-16 12:54:08.204027+03	t
159c371d-c8bf-4b7f-829a-8cf3f84d8362	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	245	200	2024-07-16 12:54:08.451759+03	t
945c87bf-99bb-4e3e-96dc-4ecd0bd4c41e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	245	200	2024-07-16 12:54:08.699472+03	t
49d00a5a-f996-4389-90ca-3e25adb5b254	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	280	200	2024-07-16 12:54:08.983173+03	t
eaa60c29-1939-4bd7-bb13-ae052825cdb3	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	287	200	2024-07-16 12:55:48.012789+03	t
b10ad708-fd7c-40d0-bd8d-06e28e65a896	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	289	200	2024-07-16 12:56:50.508933+03	t
83c7356c-2210-476c-851e-6f4e692458af	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	265	200	2024-07-16 12:56:50.785317+03	t
1a0c987f-5aff-4b12-9144-457e193aa382	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	269	200	2024-07-16 12:56:51.057006+03	t
1bdabcfa-2b03-4611-ad2b-2e8308de73a4	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	299	200	2024-07-16 12:56:51.358596+03	t
9a658630-dc86-4edd-ab52-4889122c9ecc	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	251	200	2024-07-16 12:56:51.612465+03	t
e9480517-95c3-463a-8e83-e2ea1843cfbe	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	260	200	2024-07-16 12:59:41.610435+03	t
15134112-5166-4c39-9a08-3ef2719d2713	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	255	200	2024-07-16 12:59:41.869923+03	t
8e6cfdd6-69c2-424d-bf40-1f099329df51	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	248	200	2024-07-16 12:59:42.121877+03	t
d5c4b7ae-8905-4e53-b3da-cd81667770ab	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	253	200	2024-07-16 12:59:42.376459+03	t
25e6bbf9-bb81-4b27-9a55-939852795f78	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	254	200	2024-07-16 12:59:42.633434+03	t
3ec9a0f2-95cc-4541-ae4d-ed0270b6f9ab	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	264	200	2024-07-16 13:08:51.618695+03	t
47f51a49-d77f-40ff-9655-6c6e4b2f40f5	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	263	200	2024-07-16 13:08:51.892481+03	t
9a0ce06e-db93-4d19-bc3e-4c925fe1ae4d	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	262	200	2024-07-16 13:08:52.157266+03	t
06192c96-0eb3-4959-b6df-6cc05b6ad274	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	252	200	2024-07-16 13:08:52.412407+03	t
c8dc98ca-a8c8-48b4-91f7-9d77440559d1	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	262	200	2024-07-16 13:08:52.677419+03	t
99ebabc4-74fc-4599-9a2c-2cb5b37f43af	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	260	200	2024-07-16 13:13:22.514079+03	t
cdb5feff-61ce-4be5-a743-71302d9350d0	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	253	200	2024-07-16 13:13:22.777555+03	t
b77387b9-d7a1-41bc-92c4-b5a62726b709	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	260	200	2024-07-16 13:13:23.039256+03	t
b053eea3-02fd-4847-9703-62e77ce375cf	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	309	200	2024-07-16 13:13:23.351735+03	t
913a7d58-eb88-4bff-9914-3f9fb2622fa2	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	294	200	2024-07-16 13:13:23.648342+03	t
1cf30c77-8c7d-4834-b83f-ef5c1f89f9a5	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	251	200	2024-07-16 13:14:22.512253+03	t
658c4486-9067-4612-85ba-9420069352d7	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	249	200	2024-07-16 13:14:22.771394+03	t
76a49921-9cea-4249-bed9-dd7adcfefefd	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	255	200	2024-07-16 13:14:23.028222+03	t
6438941e-8beb-477d-b49b-2b085c888533	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	250	200	2024-07-16 13:14:23.280887+03	t
13e860c3-59a9-4d1b-9a66-6449cb15e8be	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	249	200	2024-07-16 13:14:23.532895+03	t
65de7dac-dfaf-440a-a59b-b0bde9bc7c77	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	268	200	2024-07-16 13:21:40.114971+03	t
6119965c-b8ba-4bdb-b2ae-497992191690	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	261	200	2024-07-16 13:21:40.380207+03	t
43dddd64-fd50-4c60-8557-1fa31140b5f0	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	249	200	2024-07-16 13:21:40.63141+03	t
f6b04f41-956f-4876-91e8-de36b4d24213	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	252	200	2024-07-16 13:21:40.886456+03	t
35171005-2c46-4b09-9e9e-70d674f95161	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	254	200	2024-07-16 13:21:41.143731+03	t
35f321d2-dabd-4a52-a14d-a005f820af78	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	288	200	2024-07-17 09:20:14.860577+03	t
7e820cdb-3014-413d-a415-b11b435c538d	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	258	200	2024-07-17 09:20:15.150535+03	t
138128a8-87e1-49b8-8b88-19a58b514e4e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	260	200	2024-07-17 09:20:15.415369+03	t
72e8f38d-ad70-4c22-b21e-9ed885120e0e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	291	200	2024-07-17 09:20:15.708862+03	t
d8a24eae-189a-4b10-8c4b-e95b40855dd0	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	254	200	2024-07-17 09:20:15.966453+03	t
b2823ed0-d76d-41dd-8821-3cc3d0d15596	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	277	200	2024-07-17 09:21:14.614324+03	t
5017873a-9d2b-44b8-964f-2e83902b7789	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	250	200	2024-07-17 09:21:14.883822+03	t
ab074a60-386a-48f2-a8d1-3910b53540dc	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	198	500	2024-07-17 09:21:15.086377+03	f
f0a30d95-5635-4c4d-a9c2-57bf8276baec	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:21:15.092714+03	f
79ad0570-742a-4716-8696-8e78f878742a	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:21:15.097016+03	f
941a0ffb-0114-44e3-abd6-bf3e926ffef9	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	25	500	2024-07-17 09:22:14.40069+03	f
0285b952-6bd5-43f7-9a53-82d6909e91d9	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	4	500	2024-07-17 09:22:14.421791+03	f
52e6bff2-281f-478a-bdcf-b49cfe0f652c	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:22:14.426653+03	f
33103447-e314-4d58-be1c-19709945f098	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:22:14.430859+03	f
a80bc3fb-2827-4808-bc09-f83bb768b3b9	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:22:14.43516+03	f
070c93d6-92c1-4ea3-a7a0-583ed7c5c250	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	23	500	2024-07-17 09:48:04.67254+03	f
014158ff-2467-4a1d-8229-aa79af8ae41d	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:48:04.690614+03	f
59c330a8-ba23-4383-85f5-6f1e2599d98a	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:48:04.695857+03	f
00021c97-85b6-4110-a51a-46f21a89904d	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:48:04.701005+03	f
0543f0e3-d7d4-4232-bd30-0ec3b491f2cc	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	4	500	2024-07-17 09:48:04.707842+03	f
02923cc1-42b7-4c44-8d67-0d9dd2f42269	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	28	500	2024-07-17 09:49:04.532596+03	f
92a5adb8-68ac-4916-8f20-033c096f2633	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	5	500	2024-07-17 09:49:04.55171+03	f
13c6116a-d044-4f9d-affb-b89cbe902e1f	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:49:04.558268+03	f
dfdcb4b8-a71e-4ab8-9503-5b46738aad3b	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:49:04.563612+03	f
144b57d8-bdac-43d2-9e37-0f5c48718716	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:49:04.569558+03	f
9c82fe40-65a0-4793-a624-ac789877f14c	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	21	500	2024-07-17 09:50:04.517079+03	f
4129d8f6-71b6-4270-a5c5-aa4cce1459ea	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:50:04.537186+03	f
72d64d86-2c89-4d58-8326-1026d7001d31	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:50:04.541903+03	f
13b45a53-9b50-4d4d-9da9-f652796842b2	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:50:04.547334+03	f
937f22be-7c00-48e2-b38c-dd2c4edf78ca	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:50:04.554143+03	f
65d88402-6a73-4c1e-b84d-41e89672c5ed	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	22	500	2024-07-17 09:51:37.226434+03	f
083bd4fe-c152-49da-8fa0-0d9a0074aafb	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:51:37.242879+03	f
e669d0d7-e4f6-43fe-ac76-041034476069	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:51:37.247951+03	f
929a04ff-9942-42ab-a702-58869ffc5775	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:51:37.252863+03	f
dd7fb24c-23d7-453b-81f2-a5d227f67ab4	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:51:37.259343+03	f
4f3a659d-6ab5-4e75-9a6a-d4ae55beae2d	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	844	200	2024-07-17 09:52:37.946341+03	t
6a823113-4467-411d-af64-f5e0019630bb	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	778	200	2024-07-17 09:52:38.740926+03	t
fecd90e7-704e-417b-b56f-a291e553d534	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	281	200	2024-07-17 09:52:39.026869+03	t
8e54787a-1f0f-45a7-96d2-2655d5a0482e	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	799	200	2024-07-17 09:52:39.83+03	t
b1f5284c-79ee-406e-8ada-6e158c113c15	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	768	200	2024-07-17 09:52:40.60017+03	t
61292063-687e-4d22-95df-99dba60975bd	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	274	200	2024-07-17 09:53:37.34026+03	t
ef00230a-3025-423f-9585-812df7da6b80	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	381	500	2024-07-17 09:53:37.740099+03	f
433f3b1f-139b-4d95-872b-d13f207b9196	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:53:37.747431+03	f
6a8d541a-2e18-4137-af4a-d2001b52bc9d	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:53:37.753625+03	f
3fefc1c1-c3f5-4b0d-9e15-068877d1fabd	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	5	500	2024-07-17 09:53:37.763035+03	f
8c5567b0-09bd-40a8-bc6e-0017ec9c7ad7	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	23	500	2024-07-17 09:54:37.256318+03	f
8792963d-1d54-4718-bb8c-0350543d5f70	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:54:37.274201+03	f
dedccaa6-dfe4-4e91-962e-89c108743f34	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:54:37.281005+03	f
fd11cad0-507d-48e8-956f-95de27fce797	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	4	500	2024-07-17 09:54:37.28788+03	f
4aca4719-6159-4a6b-9165-02c416baad16	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	1	500	2024-07-17 09:54:37.291933+03	f
d0641a79-10b9-4cde-aa86-d9205bc7416f	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	25	500	2024-07-17 09:55:37.1606+03	f
3b092339-924b-42c4-a33b-c4f7dec15408	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	3	500	2024-07-17 09:55:37.179731+03	f
fd2f9483-7961-4ae2-99f2-230d4b73ce99	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:55:37.186943+03	f
792fef53-cdec-49ba-821f-c5406b757e95	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:55:37.191455+03	f
936be5eb-cc65-4eab-9657-920ce1250fb8	eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	2	500	2024-07-17 09:55:37.195468+03	f
\.


--
-- Data for Name: web_servers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.web_servers (id, name, url, status, created_at, updated_at) FROM stdin;
eb6bc5ef-5d73-4f59-94a3-63f68f3427d3	adi	http://localhost:3001/test	unhealthy	2024-07-16 01:20:46.892227+03	2024-07-16 01:20:46.892227+03
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- Name: migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_lock_index_seq', 1, true);


--
-- Name: email email_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email
    ADD CONSTRAINT email_pkey PRIMARY KEY (id);


--
-- Name: migrations_lock migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations_lock
    ADD CONSTRAINT migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: requests requests_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_pkey PRIMARY KEY (id);


--
-- Name: web_servers web_servers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.web_servers
    ADD CONSTRAINT web_servers_pkey PRIMARY KEY (id);


--
-- Name: requests requests_server_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.requests
    ADD CONSTRAINT requests_server_id_foreign FOREIGN KEY (server_id) REFERENCES public.web_servers(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

