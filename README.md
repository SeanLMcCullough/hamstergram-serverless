# Hamstergram

Social networking, but with hamsters.

## Table of Contents

- [Overview](#overview)
- [User Stores](#user-stories)
- [implementation](#implementation)
- [Installation](#installation)
- [TODO](#todo)

## Overview

Hamstergram is a basic small CRUD application demonstrating very basic social media functionality.
It implements a few functionalities but nothing too complex. Posting text and liking posts is about its limits for now.

Hamstergram is built on a JAMstack, using a dockerable Node.JS back-end API with minimal configuration,
and a Vue.JS front-end which can be hosted in a static bucket.

## User Stories

1. As a hamster, I want to sign up to a platform so I can connect with other the hamsters on the network
2. As a social hamster, I want to be able to share posts with hamsters in the network
3. As a social hamster I want the hamsters in the network to like my posts


## Implementation

For this implementation, I picked the following stack:

- Vue.JS for the front-end, as I find it clean, succinct, and consistent
- Node.JS for the back-end, a DDD express API with PassportJS for authorization
- Google Auth, as it is the most widely accepted and standards compliant
- MongoDB with Mongoose, as it is most applicable to Adepto's technical goals
- Docker to wrap it all up nicely
- Monorepo to keep the services together
- AWS S3 for the static website

## Installation
```bash
lerna bootstrap
```

## TODO

- Limit hamsters from liking more than once at the API
- Add profile images
- Add post deletion
- Add ability to unlike posts
