DROP TABLE IF EXISTS egov_db.sessions;

DROP TABLE IF EXISTS egov_db.login_logs;

DROP TABLE IF EXISTS egov_db.auth_credentials;

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

CREATE TABLE IF NOT EXISTS egov_db.auth_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    secret_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_auth_credentials_user FOREIGN KEY (user_id) REFERENCES egov_db.user (id) ON DELETE CASCADE,
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