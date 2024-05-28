CREATE TABLE IF NOT EXISTS `token_public_key` (
    `token_public_key_id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `token_public_key_value` VARBINARY(4096) NOT NULL
);