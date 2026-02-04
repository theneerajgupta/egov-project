DROP TABLE IF EXISTS egov_db.sessions;
DROP TABLE IF EXISTS egov_db.login_logs;
DROP TABLE IF EXISTS egov_db.auth_credentials;
DROP TABLE IF EXISTS egov_db.user;
DROP TABLE IF EXISTS egov_db.user_type;

CREATE TABLE IF NOT EXISTS egov_db.user_type (
	id				INT AUTO_INCREMENT PRIMARY KEY,
	name			VARCHAR(20) NOT NULL,
	description		VARCHAR(255) 	
);

CREATE TABLE IF NOT EXISTS egov_db.user (
	id				INT AUTO_INCREMENT PRIMARY KEY,
	user_type_id	INT NOT NULL,
	email			VARCHAR(100) NOT NULL,
	phone			VARCHAR(15),
	display_name	VARCHAR(200) NOT NULL,
	status 			ENUM('ACTIVE', 'DISABLED', 'DELETED') NOT NULL DEFAULT 'ACTIVE',
	created_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at 		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_user_user_type
		FOREIGN KEY (user_type_id)
		REFERENCES egov_db.user_type(id),
	UNIQUE(email)
);

CREATE TABLE IF NOT EXISTS egov_db.auth_credentials (
	id				INT AUTO_INCREMENT PRIMARY KEY,
	user_id			INT NOT NULL,
	secret_hash		VARCHAR(255) NOT NULL,
	created_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT fk_auth_credentials_user
		FOREIGN KEY (user_id)
		REFERENCES egov_db.user(id)
		ON DELETE CASCADE,
	UNIQUE(user_id)
);

CREATE TABLE IF NOT EXISTS egov_db.login_logs (
	id				INT AUTO_INCREMENT PRIMARY KEY,
	user_id			INT NULL,
	ip_address		VARCHAR(40) NOT NULL,
	attempted_email	VARCHAR(100) NOT NULL,
	success			BOOLEAN NOT NULL DEFAULT TRUE,
	failure_reason	VARCHAR(2000),
	created_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_login_logs_user 
		FOREIGN KEY (user_id)
		REFERENCES egov_db.user(id),
	INDEX idx_login_logs_created(created_at),
	INDEX idx_login_logs_email(attempted_email)
);

CREATE TABLE IF NOT EXISTS egov_db.sessions (
	id				INT AUTO_INCREMENT PRIMARY KEY,
	user_id			INT NOT NULL,
	token_hash		VARCHAR(260) NOT NULL,
	expires_at		TIMESTAMP NOT NULL,
	revoked_at		TIMESTAMP,
	created_at		TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT fk_sessions_user
		FOREIGN KEY (user_id)
		REFERENCES egov_db.user(id),
	UNIQUE(token_hash),
	INDEX idx_sessions_user (user_id),
	INDEX idx_sessions_expires (expires_at)
);

#-----------| SEEDING |-----------#

INSERT INTO egov_db.user_type (name, description) VALUES
('dg_officer', 'Directorate General Officer'),
('dg_nodal_officer', 'DG Nodal Officer'),
('seafarer', 'Registered Seafarer'),
('rpsl_rep', 'Recruitment and Placement Service Licensee Representative'),
('mti_rep', 'Maritime Training Institute Representative'),
('union_rep', 'Seafarer Union Representative'),
('shipping_company_rep', 'Shipping Company Representative');


INSERT INTO egov_db.user (user_type_id, email, phone, display_name) VALUES
-- DG officers
((SELECT id FROM egov_db.user_type WHERE name='dg_officer'),
 'dg.officer1@gov.in', '9000000001', 'DG Officer One'),
((SELECT id FROM egov_db.user_type WHERE name='dg_nodal_officer'),
 'dg.nodal@gov.in', '9000000002', 'DG Nodal Officer'),
-- Seafarers
((SELECT id FROM egov_db.user_type WHERE name='seafarer'),
 'seafarer1@mail.com', '9000000003', 'Rahul Seafarer'),
((SELECT id FROM egov_db.user_type WHERE name='seafarer'),
 'seafarer2@mail.com', '9000000004', 'Amit Seafarer'),
-- RPSL
((SELECT id FROM egov_db.user_type WHERE name='rpsl_rep'),
 'rpsl.rep@mail.com', '9000000005', 'RPSL Representative'),
-- MTI
((SELECT id FROM egov_db.user_type WHERE name='mti_rep'),
 'mti.rep@mail.com', '9000000006', 'MTI Representative'),
-- Union
((SELECT id FROM egov_db.user_type WHERE name='union_rep'),
 'union.rep@mail.com', '9000000007', 'Union Representative'),
-- Shipping companies
((SELECT id FROM egov_db.user_type WHERE name='shipping_company_rep'),
 'shipco.rep1@mail.com', '9000000008', 'Shipping Co Rep One'),
((SELECT id FROM egov_db.user_type WHERE name='shipping_company_rep'),
 'shipco.rep2@mail.com', '9000000009', 'Shipping Co Rep Two'),
((SELECT id FROM egov_db.user_type WHERE name='shipping_company_rep'),
 'shipco.rep3@mail.com', '9000000010', 'Shipping Co Rep Three');


SELECT * FROM egov_db.user_type ut ;
SELECT * FROM egov_db.user u; 


INSERT INTO egov_db.auth_credentials (user_id, secret_hash)
SELECT id, '$2b$10$testhashplaceholder'
FROM egov_db.user;


SELECT * FROM egov_db.auth_credentials ac ;

-- Check users with roles
SELECT u.id, u.display_name, u.email, ut.name AS role
FROM egov_db.user u
JOIN egov_db.user_type ut ON ut.id = u.user_type_id;

-- Check credentials
SELECT u.email, ac.secret_hash
FROM egov_db.auth_credentials ac
JOIN egov_db.user u ON u.id = ac.user_id;
