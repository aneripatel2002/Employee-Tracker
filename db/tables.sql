DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS job;
DROP TABLE IF EXISTS employee;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE job (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary NUMERIC NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department (id)  
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    job_id INTEGER,
    FOREIGN KEY (job_id) REFERENCES job (id),
    manager_id INTEGER,
    FOREIGN KEY (manager_id) REFERENCES employee (id)
);
