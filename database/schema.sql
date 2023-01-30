DROP DATABASE IF EXISTS intelliqdb;
CREATE USER IF NOT EXISTS 'softenguser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
CREATE DATABASE intelliqdb;
GRANT ALL PRIVILEGES ON intelliqdb.* TO 'softenguser'@'localhost';

USE intelliqdb;

CREATE TABLE questionnaire(
    questionnaire_id varchar(30) NOT NULL,
    title varchar(200) NOT NULL,
    PRIMARY KEY (questionnaire_id)
);

CREATE TABLE keywords(
    questionnaire_id varchar(30) NOT NULL,
    word varchar(30) NOT NULL,
        CONSTRAINT questionnaire_keyword FOREIGN KEY (questionnaire_id)
        REFERENCES questionnaire(questionnaire_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (questionnaire_id, word)
);

CREATE TABLE question(
    questionnaire_id varchar(30) NOT NULL,
    q_id varchar(30) NOT NULL,
    q_text varchar(200) NOT NULL,
    is_profile boolean NOT NULL,
        CONSTRAINT question_of_survey FOREIGN KEY (questionnaire_id)
        REFERENCES questionnaire(questionnaire_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (questionnaire_id, q_id)
);

CREATE TABLE q_option(
    questionnaire_id varchar(30) NOT NULL,
    opt_id varchar(30) NOT NULL,
    q_id varchar(30) NOT NULL,
    opt_text varchar(100),
    nextq_id varchar(30) NOT NULL,
        CONSTRAINT option_of_q FOREIGN KEY (questionnaire_id, q_id)
        REFERENCES question(questionnaire_id, q_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        -- CONSTRAINT nextq_option FOREIGN KEY (questionnaire_id, nextq_id)
        -- REFERENCES question(questionnaire_id, q_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (questionnaire_id, opt_id)
);

CREATE TABLE answer(
    questionnaire_id varchar(30) NOT NULL,
    q_id varchar(30) NOT NULL,
    session_id varchar(4),
    ans varchar(100) NOT NULL,
        CONSTRAINT answer_of_q FOREIGN KEY (questionnaire_id, q_id)
        REFERENCES question(questionnaire_id, q_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (questionnaire_id, q_id, session_id)
);
