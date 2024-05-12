CREATE TABLE IF NOT EXISTS company_profile_image_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    object_name VARCHAR(2000) NOT NULL,
    expire_time BIGINT UNSIGNED PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS company_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    name_lowercase VARCHAR(256) NOT NULL,
    company_profile_image_id BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (company_profile_image_id) REFERENCES company_profile_image_tab(id)
);

CREATE TABLE IF NOT EXISTS location_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    country CHAR(2) NOT NULL,
    state VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS position_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    title_lowercase VARCHAR(256) NOT NULL,
    level TINYINT NOT NULL
);

CREATE TABLE IF NOT EXISTS offer_image_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    object_name VARCHAR(2000) NOT NULL,
    expire_time BIGINT UNSIGNED PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS offer_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    account_id BIGINT UNSIGNED NOT NULL,
    company_id BIGINT UNSIGNED NOT NULL,
    location_id BIGINT UNSIGNED NOT NULL,
    position_id BIGINT UNSIGNED NOT NULL,
    offer_image_id BIGINT UNSIGNED NOT NULL,
    total_package_amount BIGINT UNSIGNED NOT NULL,
    total_package_currency CHAR(3) NOT NULL,
    created_time BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company_tab(id),
    FOREIGN KEY (location_id) REFERENCES location_tab(id),
    FOREIGN KEY (position_id) REFERENCES position_tab(id),
    FOREIGN KEY (offer_image_id) REFERENCES offer_image_tab(id)
);

CREATE TABLE IF NOT EXISTS aggregated_company_stat_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    company_id BIGINT UNSIGNED NOT NULL,
    total_offer_count BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company_tab(id)
);

CREATE TABLE IF NOT EXISTS aggregated_company_offer_stat_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    company_id BIGINT UNSIGNED NOT NULL,
    location_id BIGINT UNSIGNED NOT NULL,
    position_id BIGINT UNSIGNED NOT NULL,
    total_package_minimum_amount BIGINT UNSIGNED NOT NULL,
    total_package_maximum_amount BIGINT UNSIGNED NOT NULL,
    total_package_currency CHAR(3) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company_tab(id),
    FOREIGN KEY (location_id) REFERENCES location_tab(id),
    FOREIGN KEY (position_id) REFERENCES position_tab(id)
);