CREATE TABLE IF NOT EXISTS task
(
    id          INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(255)                   DEFAULT NULL,
    description VARCHAR(255)                   DEFAULT NULL,
    priority    ENUM ('low', 'normal', 'high') DEFAULT NULL,
    status      BIT(1)           NOT NULL,
    due_date    DATETIME(6)                    DEFAULT NULL
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS comment
(
    id      INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    text    VARCHAR(255)     DEFAULT NULL,
    task_id INT(11) UNSIGNED DEFAULT NULL,
    date    DATETIME(6)      DEFAULT NULL,
    FOREIGN KEY (task_id) REFERENCES task (id) ON DELETE CASCADE
) ENGINE = InnoDB;
