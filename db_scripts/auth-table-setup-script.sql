DROP TABLE IF EXISTS egov_db.sessions;

DROP TABLE IF EXISTS egov_db.login_logs;

DROP TABLE IF EXISTS egov_db.auth;

DROP TABLE IF EXISTS egov_db.user;

DROP TABLE IF EXISTS egov_db.user_type;

CREATE TABLE IF NOT EXISTS egov_db.user_type (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(20) NOT NULL,
    name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS egov_db.user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_type_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15),
    display_name VARCHAR(200) NOT NULL,
    status ENUM(
        'ACTIVE',
        'DISABLED',
        'DELETED'
    ) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_user_user_type FOREIGN KEY (user_type_id) REFERENCES egov_db.user_type (id),
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS egov_db.auth (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    secret_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_auth_user FOREIGN KEY (user_id) REFERENCES egov_db.user (id) ON DELETE CASCADE,
    UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS egov_db.login_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NULL,
    ip_address VARCHAR(40) NOT NULL,
    attempted_email VARCHAR(100) NOT NULL,
    success BOOLEAN NOT NULL DEFAULT TRUE,
    failure_reason VARCHAR(2000),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_login_logs_user FOREIGN KEY (user_id) REFERENCES egov_db.user (id),
    INDEX idx_login_logs_created (created_at),
    INDEX idx_login_logs_email (attempted_email)
);

CREATE TABLE IF NOT EXISTS egov_db.sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token_hash VARCHAR(260) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    revoked_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_sessions_user FOREIGN KEY (user_id) REFERENCES egov_db.user (id),
    UNIQUE (token_hash),
    INDEX idx_sessions_user (user_id),
    INDEX idx_sessions_expires (expires_at)
);

#-----------| SEEDING |-----------#

INSERT INTO egov_db.user_type (code, name) VALUES
('dg_admin', 'DG Admin'),
('dg', 'Directorate General'),
('ddg', 'Deputy Directorate General'),
('adg', 'Assistant Directorate General'),
('dg_nodal_officer', 'Nodal Officer'),
('dg_officer', 'DG Officer'),
('dg_helpdesk', 'DG Helpdesk'),
('seafarer', 'Seafarer'),
('next_of_kin', 'Next of Kin'),
('rpsl_rep', 'Recruitment and Placement Service Licensee Representative'),
('mti_rep', 'Maritime Training Institute Representative'),
('union_rep', 'Seafarer Union Representative'),
('shipping_company_rep', 'Shipping Company Representative');

START TRANSACTION;

-- Seed users
INSERT INTO
    egov_db.user (
        user_type_id,
        email,
        phone,
        display_name,
        status
    )
VALUES (
        1,
        'admin1@egov.test',
        '9000000001',
        'Admin One',
        'ACTIVE'
    ),
    (
        2,
        'dg1@egov.test',
        '9000000002',
        'DG One',
        'ACTIVE'
    ),
    (
        3,
        'ddg1@egov.test',
        '9000000003',
        'DDG One',
        'ACTIVE'
    ),
    (
        4,
        'adg1@egov.test',
        '9000000004',
        'ADG One',
        'ACTIVE'
    ),
    (
        5,
        'nodal1@egov.test',
        '9000000005',
        'Nodal Officer One',
        'ACTIVE'
    ),
    (
        6,
        'officer1@egov.test',
        '9000000006',
        'DG Officer One',
        'ACTIVE'
    ),
    (
        7,
        'helpdesk1@egov.test',
        '9000000007',
        'Helpdesk One',
        'ACTIVE'
    ),
    (
        8,
        'seafarer1@egov.test',
        '9000000008',
        'Seafarer One',
        'ACTIVE'
    ),
    (
        9,
        'kin1@egov.test',
        '9000000009',
        'Next of Kin One',
        'ACTIVE'
    ),
    (
        10,
        'rpsl1@egov.test',
        '9000000010',
        'RPSL Rep One',
        'ACTIVE'
    );

-- Seed auth credentials for all users above
INSERT INTO
    egov_db.auth (user_id, secret_hash)
SELECT id, '$2b$10$REPLACE_WITH_REAL_HASH'
FROM egov_db.user
WHERE
    email IN (
        'admin1@egov.test',
        'dg1@egov.test',
        'ddg1@egov.test',
        'adg1@egov.test',
        'nodal1@egov.test',
        'officer1@egov.test',
        'helpdesk1@egov.test',
        'seafarer1@egov.test',
        'kin1@egov.test',
        'rpsl1@egov.test'
    );

COMMIT;