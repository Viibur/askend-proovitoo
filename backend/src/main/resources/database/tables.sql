DROP TABLE IF EXISTS filter;
CREATE TABLE filter
(
    ID     INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    NAME   VARCHAR(255) NOT NULL,
    OPTION INT          NOT NULL
);

DROP TABLE IF EXISTS criteria;
CREATE TABLE criteria
(
    id             INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    filter_id      INT          NOT NULL,
    type           VARCHAR(255) NOT NULL,
    condition      VARCHAR(255) NOT NULL,
    criteria_value VARCHAR(255) NOT NULL,
    FOREIGN KEY (filter_id) REFERENCES filter (id) ON DELETE CASCADE
);