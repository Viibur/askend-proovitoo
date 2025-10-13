INSERT INTO FILTER (name, option)
VALUES ('TestFilter1', 1),
       ('TestFilter2', 2);

INSERT INTO CRITERIA (filter_id, type, condition, criteria_value)
VALUES (1, 'AMOUNT', 'LESS', '50');

INSERT INTO CRITERIA (filter_id, type, condition, criteria_value)
VALUES (2, 'AMOUNT', 'MORE', '100'),
       (2, 'TITLE', 'STARTS_WITH', 'Shaw'),
       (2, 'DATE', 'FROM', '2025-10-20');