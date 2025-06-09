-- Database schema from prompt
-- (abbreviated for brevity)
CREATE TABLE IF NOT EXISTS public.realtor (
   realtor_id   bigserial primary key,
   uuid         uuid       not null unique default gen_random_uuid(),
   phone        varchar(50)  not null,
   f_name       varchar(125) not null,
   e_name       varchar(125) not null,
   video_url    varchar(600),
   email        varchar(255),
   website_url  varchar(600),
   created_at   timestamptz default now()
);

CREATE TABLE IF NOT EXISTS public.google_credentials (
   realtor_id    bigint primary key references public.realtor(realtor_id) on delete cascade,
   access_token  varchar(255) not null,
   refresh_token varchar(255) not null,
   token_expires timestamptz not null,
   created_at    timestamptz default now()
);

CREATE TABLE IF NOT EXISTS public.google_calendar_events (
   id              bigserial primary key,
   realtor_id      bigint not null references public.realtor(realtor_id) on delete cascade,
   google_event_id varchar(255) not null,
   summary         varchar(255),
   description     text,
   start_time      timestamptz not null,
   end_time        timestamptz not null,
   created_at      timestamptz default now()
);

-- Lead table used for generating user reports
CREATE TABLE IF NOT EXISTS public.lead (
   lead_id      bigserial primary key,
   phone        varchar(50) not null unique,
   f_name       varchar(125) not null,
   l_name       varchar(125) not null,
   zipcode      varchar(20),
   address      varchar(255),
   quiz_summary text,
   sms_summary  text,
   created_at   timestamptz default now()
);
