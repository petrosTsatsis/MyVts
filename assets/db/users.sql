INSERT INTO roles VALUES (1, 'ROLE_ADMIN');
INSERT INTO ROLES VALUES(2,'ROLE_SELLER');
INSERT INTO ROLES VALUES(3,'ROLE_BUYER');

INSERT INTO USERS VALUES(1,'admin@gmail.com','$2a$12$UQBpJuYn9nhq/MDdWBgw.OmcTrcaDhve03L0Tf89iemyxoZRrByIy','admin');
INSERT INTO USERS VALUES(2,'seller@gmail.com','$2a$12$UQBpJuYn9nhq/MDdWBgw.OmcTrcaDhve03L0Tf89iemyxoZRrByIy','seller');
INSERT INTO USERS VALUES(3,'buyer@gmail.com','$2a$12$UQBpJuYn9nhq/MDdWBgw.OmcTrcaDhve03L0Tf89iemyxoZRrByIy','buyer');

INSERT INTO user_roles values(1,1);
INSERT INTO user_roles values(2,2);
INSERT INTO user_roles values(3,3);
