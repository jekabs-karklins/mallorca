CREATE TABLE users (
    "id" SERIAL PRIMARY KEY,        -- Auto-incrementing ID, typically used as a primary key
    "name" VARCHAR(255) NOT NULL,   -- User's name
    "email" VARCHAR(255) NOT NULL UNIQUE, -- User's email address, unique to ensure no duplicates
    "oauthSub" VARCHAR(255) UNIQUE, -- OAuth subject identifier, unique for each OAuth identity
    "membershipEndDate" DATE DEFAULT NULL, -- Boolean flag to indicate VIP status, default is 'FALSE'
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of record creation
    "lastLogin" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP -- Timestamp of record creation
);


CREATE TABLE payments (
    "id" SERIAL PRIMARY KEY,                          -- Auto-incrementing ID, used as a primary key
    "userId" INTEGER NOT NULL REFERENCES users(id),   -- Foreign key referencing the 'users' table
    "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, -- Timestamp of payment creation
    "amount" INTEGER NOT NULL,                        -- Payment amount in the smallest currency unit (e.g., cents for USD)
    "stripePaymentId" VARCHAR(255) NOT NULL UNIQUE,   -- Unique Stripe payment identifier
    "paymentMethod" VARCHAR(255),                     -- Payment method details
    "receiptEmail" VARCHAR(255),                      -- Email to which the receipt was sent
    "metadata" JSONB                                  -- JSONB column to store additional metadata from Stripe
);

