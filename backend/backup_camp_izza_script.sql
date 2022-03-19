create table camp_weeks
(
    id          int auto_increment
        primary key,
    term        varchar(255) not null,
    name        varchar(255) not null,
    start       datetime     not null,
    end         datetime     not null,
    earlyCost   float        not null,
    regularCost float        not null,
    earlyCutOff date         not null,
    constraint camp_weeks_id_uindex
        unique (id)
);

create table `groups`
(
    id           int auto_increment
        primary key,
    name         varchar(255) not null,
    camp_week_id int          not null,
    camperLimit  int          not null,
    constraint groups_id_uindex
        unique (id),
    constraint groups_pk
        unique (name, camp_week_id),
    constraint groups_camp_weeks_id_fk
        foreign key (camp_week_id) references camp_weeks (id)
            on delete cascade
);

create table shirts
(
    id    int auto_increment
        primary key,
    name  varchar(255) not null,
    size  varchar(255) not null,
    price float        not null,
    constraint shirts_id_uindex
        unique (id),
    constraint shirts_pk
        unique (name, size)
);

create table users
(
    id    varchar(255) not null
        primary key,
    email varchar(255) not null,
    role  varchar(255) not null,
    constraint users_email_uindex
        unique (email),
    constraint users_id_uindex
        unique (id)
);

create table admins
(
    id        varchar(255) not null
        primary key,
    email     varchar(255) not null,
    firstName varchar(255) not null,
    lastName  varchar(255) not null,
    phone     varchar(255) not null,
    constraint admins_email_uindex
        unique (email),
    constraint admins_id_uindex
        unique (id),
    constraint admins_users_email_fk
        foreign key (email) references users (email)
            on update cascade on delete cascade,
    constraint admins_users_id_fk
        foreign key (id) references users (id)
            on delete cascade
);

create table counselors
(
    id        varchar(255)         not null
        primary key,
    email     varchar(255)         not null,
    firstName varchar(255)         not null,
    lastName  varchar(255)         not null,
    gender    varchar(255)         not null,
    dob       date                 not null,
    phone     varchar(255)         not null,
    altPhone  varchar(255)         null,
    approved  tinyint(1) default 0 not null,
    active    tinyint(1) default 0 null,
    constraint counselors_email_uindex
        unique (email),
    constraint counselors_id_uindex
        unique (id),
    constraint counselors_users_email_fk
        foreign key (email) references users (email)
            on update cascade on delete cascade,
    constraint counselors_users_id_fk
        foreign key (id) references users (id)
            on delete cascade
);

create table counselor_attendances
(
    id           int auto_increment
        primary key,
    counselor_id varchar(255) not null,
    date         date         not null,
    present      tinyint(1)   not null,
    comment      varchar(255) not null,
    constraint counselor_attendances_id_uindex
        unique (id),
    constraint counselor_attendances_pk
        unique (counselor_id, date),
    constraint counselor_attendances_counselors_id_fk
        foreign key (counselor_id) references counselors (id)
            on delete cascade
);

create table counselor_medical_records
(
    id               int auto_increment
        primary key,
    counselor_id     varchar(255) not null,
    doctorName       varchar(255) not null,
    doctorPhone      varchar(255) not null,
    insuranceCarrier varchar(255) not null,
    policyHolder     varchar(255) not null,
    allergies        varchar(255) not null,
    illnesses        varchar(255) not null,
    immunizations    varchar(255) not null,
    medications      varchar(255) not null,
    accommodations   varchar(255) not null,
    constraint counselor_medical_record_counselors_id_fk
        unique (counselor_id),
    constraint counselor_medical_records_id_uindex
        unique (id),
    constraint counselor_medical_records_counselors_id_fk
        foreign key (counselor_id) references counselors (id)
            on delete cascade
);

create table emergency_contacts
(
    id         int auto_increment
        primary key,
    user_id    varchar(255) not null,
    firstName  varchar(255) not null,
    lastName   varchar(255) not null,
    relation   varchar(255) not null,
    phone      varchar(255) not null,
    authPickUp tinyint(1)   not null,
    constraint emergency_contacts_id_uindex
        unique (id),
    constraint emergency_contacts_users_id_fk
        foreign key (user_id) references users (id)
            on delete cascade
);

create table parents
(
    id                 varchar(255)  not null
        primary key,
    email              varchar(255)  not null,
    firstName          varchar(255)  not null,
    lastName           varchar(255)  not null,
    phone              varchar(255)  not null,
    addressLine1       varchar(255)  not null,
    addressLine2       varchar(255)  not null,
    city               varchar(255)  not null,
    zipCode            varchar(255)  not null,
    state              varchar(255)  not null,
    country            varchar(255)  not null,
    guardian2FirstName varchar(255)  not null,
    guardian2LastName  varchar(255)  not null,
    guardian2Email     varchar(255)  not null,
    guardian2Phone     varchar(255)  not null,
    credit             int default 0 not null,
    constraint parents_email_uindex
        unique (email),
    constraint parents_id_uindex
        unique (id),
    constraint parents_users_email_fk
        foreign key (email) references users (email)
            on update cascade on delete cascade,
    constraint parents_users_id_fk
        foreign key (id) references users (id)
            on delete cascade
);

create table campers
(
    id        int auto_increment
        primary key,
    parent_id varchar(255)    not null,
    firstName varchar(255)    not null,
    lastName  varchar(255)    not null,
    gender    varchar(255)    not null,
    dob       date            not null,
    grade     int             not null,
    school    varchar(255)    not null,
    shirtSize varchar(255)    not null,
    numShirts int   default 1 not null,
    paid      float default 0 not null,
    constraint campers_id_uindex
        unique (id),
    constraint campers_parents_id_fk
        foreign key (parent_id) references parents (id)
            on delete cascade
);

create table camper_attendances
(
    id        int auto_increment
        primary key,
    camper_id int          not null,
    date      date         not null,
    present   tinyint(1)   not null,
    pickedUp  tinyint(1)   not null,
    comment   varchar(255) not null,
    constraint camper_attendances_id_uindex
        unique (id),
    constraint camper_attendances_pk
        unique (camper_id, date),
    constraint camper_attendances_campers_id_fk
        foreign key (camper_id) references campers (id)
            on delete cascade
);

create table camper_medical_records
(
    id                   int auto_increment
        primary key,
    camper_id            int          not null,
    doctorName           varchar(255) not null,
    doctorPhone          varchar(255) not null,
    insuranceCarrier     varchar(255) not null,
    policyHolder         varchar(255) not null,
    allergies            varchar(255) not null,
    restrictedActivities varchar(255) not null,
    illnesses            varchar(255) not null,
    immunizations        varchar(255) not null,
    medicalTreatments    varchar(255) not null,
    medications          varchar(255) not null,
    tetanusDate          date         not null,
    comments             text         not null,
    constraint camper_medical_records_campers_id_fk
        unique (camper_id),
    constraint camper_medical_records_id_uindex
        unique (id),
    constraint camper_medical_records_campers_id_fk
        foreign key (camper_id) references campers (id)
            on delete cascade
);

create table registered_camper_weeks
(
    id           int auto_increment
        primary key,
    camper_id    int not null,
    camp_week_id int not null,
    group_id     int null,
    constraint registered_camper_weeks_id_uindex
        unique (id),
    constraint registered_camper_weeks_pk
        unique (camp_week_id, camper_id),
    constraint registered_camper_weeks_camp_weeks_id_fk
        foreign key (camp_week_id) references camp_weeks (id)
            on delete cascade,
    constraint registered_camper_weeks_campers_id_fk
        foreign key (camper_id) references campers (id)
            on delete cascade,
    constraint registered_camper_weeks_groups_id_fk
        foreign key (group_id) references `groups` (id)
            on delete set null
);

create table payment_informations
(
    id                         int auto_increment
        primary key,
    user_id                    varchar(255)    null,
    registered_camper_weeks_id int             null,
    numShirts                  int   default 0 not null,
    totalCost                  float           not null,
    totalPaidUSD               float default 0 not null,
    totalPaidCredit            float default 0 null,
    transactionTime            datetime        not null,
    constraint payment_informations_id_uindex
        unique (id),
    constraint payment_informations_registered_camper_weeks_id_fk
        foreign key (registered_camper_weeks_id) references registered_camper_weeks (id)
            on delete set null,
    constraint payment_informations_users_id_fk
        foreign key (user_id) references users (id)
)
    comment 'may not be needed if paypal logs transaction history  ';

create index registered_camper_weeks_camp_week_id_index
    on registered_camper_weeks (camp_week_id);

create table registered_counselor_weeks
(
    id           int auto_increment
        primary key,
    counselor_id varchar(255) not null,
    camp_week_id int          not null,
    group_id     int          null,
    constraint registered_counselor_weeks_id_uindex
        unique (id),
    constraint registered_counselor_weeks_pk
        unique (counselor_id, camp_week_id),
    constraint registered_counselor_weeks_camp_weeks_id_fk
        foreign key (camp_week_id) references camp_weeks (id)
            on delete cascade,
    constraint registered_counselor_weeks_counselors_id_fk
        foreign key (counselor_id) references counselors (id)
            on delete cascade,
    constraint registered_counselor_weeks_groups_id_fk
        foreign key (group_id) references `groups` (id)
            on delete set null
);

create index registered_counselor_weeks_camp_week_id_index
    on registered_counselor_weeks (camp_week_id);


