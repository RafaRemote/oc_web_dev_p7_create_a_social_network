INSERT INTO users 
VALUES 
    (DEFAULT, "Patryck", "pat@aol.com", "vm02jjipjvpwmmvwv;mfs9jxx2epwjm", 0, NOW(), NOW()),
    (DEFAULT, "Pamela", "pam@aol.com", "vm02jjipjvpwm23ff2ffs9j2xepwjm", 0, NOW(), NOW()),
    (DEFAULT, "Antoine", "antoine@aol.com", "vj9jjrf3wpvjnvmsxxxvwipsi", 0, NOW(), NOW()),
    (DEFAULT, "Didier", "didier@aol.com", "vj9jjvrvxxr3wpvjnvmsvwipsi", 0, NOW(), NOW()),
    (DEFAULT, "Charles", "charles@aol.com", "vj9jjvrvrxxxx3wpvjnvmsvwipsi", 0, NOW(), NOW());

INSERT INTO messages
    VALUES  (DEFAULT, "La Polka !", "http://localhost:3000/images/gif1.gif", NOW(), NOW(), 2), 
            (DEFAULT, "Lama Dance...", "http://localhost:3000/images/gif2.gif", NOW(), NOW(), 4), 
            (DEFAULT, "Jogging !", "http://localhost:3000/images/gif3.gif", NOW(), NOW(), 6),
            (DEFAULT, "Pacattack", "http://localhost:3000/images/gif4.gif", NOW(), NOW(), 3);

INSERT INTO comments
    VALUES
    (DEFAULT, "lol", NOW(), NOw(), 1, 1, DEFAULT),
    (DEFAULT, "top", NOW(), NOw(), 2, 1, DEFAULT),
    (DEFAULT, "super", NOW(), NOw(), 3, 1, DEFAULT),
    (DEFAULT, "fun", NOW(), NOw(), 4, 2, DEFAULT),
    (DEFAULT, "cool", NOW(), NOw(), 5, 2, DEFAULT),
    (DEFAULT, "extra", NOW(), NOw(), 6, 2, DEFAULT),
    (DEFAULT, "trop bien", NOW(), NOw(), 5, 3, DEFAULT),
    (DEFAULT, "nul", NOW(), NOw(), 4, 3, DEFAULT),
    (DEFAULT, "on aura tout vu", NOW(), NOw(), 3, 4, DEFAULT),
    (DEFAULT, "dingue....", NOW(), NOw(), 2, 4, DEFAULT);
