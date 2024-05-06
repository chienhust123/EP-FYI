CREATE TABLE IF NOT EXISTS company_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    profile_image_url VARCHAR(2000) NOT NULL
);

CREATE TABLE IF NOT EXISTS location_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    country CHAR(2) NOT NULL,
    state VARCHAR(64) NOT NULL,
    city VARCHAR(64) NOT NULL
);

CREATE TABLE IF NOT EXISTS position_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    company_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(256) NOT NULL,
    code VARCHAR(64) NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company_tab(id)
);

CREATE TABLE IF NOT EXISTS aggregated_company_stat_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    company_id BIGINT UNSIGNED NOT NULL,
    total_offer_count BIGINT UNSIGNED NOT NULL,
    FOREIGN KEY (company_id) REFERENCES company_tab(id)
);

CREATE TABLE IF NOT EXISTS aggregated_company_offer_stat_tab (
    id BIGINT UNSIGNED PRIMARY KEY,
    location_id BIGINT UNSIGNED NOT NULL,
    position_id BIGINT UNSIGNED NOT NULL,
    total_package_minimum_amount BIGINT UNSIGNED NOT NULL,
    total_package_maximum_amount BIGINT UNSIGNED NOT NULL,
    total_package_currency CHAR(3) NOT NULL,
    FOREIGN KEY (location_id) REFERENCES location_tab(id),
    FOREIGN KEY (position_id) REFERENCES position_tab(id)
);