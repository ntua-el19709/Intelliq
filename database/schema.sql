DROP DATABASE IF EXISTS intelliqdb;
CREATE USER IF NOT EXISTS 'softenguser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
CREATE DATABASE intelliqdb;
GRANT ALL PRIVILEGES ON intelliqdb.* TO 'softenguser'@'localhost';
GRANT SYSTEM_VARIABLES_ADMIN ON *.* TO 'softenguser'@'localhost';

USE intelliqdb;

CREATE TABLE questionnaire(
    questionnaire_id INT NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    PRIMARY KEY (questionnaire_id)
);

CREATE TABLE keywords(
    questionnaire_id INT NOT NULL,
    word varchar(30) NOT NULL,
        CONSTRAINT questionnaire_keyword FOREIGN KEY (questionnaire_id)
        REFERENCES questionnaire(questionnaire_id) ON DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (questionnaire_id, word)
);

CREATE TABLE question(
    q_id INT NOT NULL AUTO_INCREMENT,
    questionnaire_id INT NOT NULL,
    q_text varchar(100) NOT NULL,
    is_profile boolean NOT NULL,
        CONSTRAINT question_of_survey FOREIGN KEY (questionnaire_id)
        REFERENCES questionnaire(questionnaire_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (q_id)
);

CREATE TABLE q_option(
    opt_id INT NOT NULL AUTO_INCREMENT,
    opt_text varchar(100) NOT NULL,
    q_id INT NOT NULL,
    nextq_id INT NOT NULL,
        CONSTRAINT option_of_q FOREIGN KEY (q_id)
        REFERENCES question(q_id) ON  DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT nextq_option FOREIGN KEY (nextq_id)
        REFERENCES question(q_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (opt_id)
);

CREATE TABLE answer(
    ans_id INT NOT NULL AUTO_INCREMENT,
    q_id INT NOT NULL,
    session_id varchar(32),
    ans_text varchar(100) NOT NULL,
        CONSTRAINT answer_of_q FOREIGN KEY (q_id)
        REFERENCES question(q_id) ON  DELETE CASCADE ON UPDATE CASCADE,
    PRIMARY KEY (ans_id)
);
