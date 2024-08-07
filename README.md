<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Summary 🐣](#summary-)
- [Analysis problem and Solution 🧐](#analysis-problem-and-solution-)
  - [Problem](#problem)
  - [Analysis](#analysis)
  - [My solution](#my-solution)
- [Architecture 📑](#architecture-)
  - [Database diagram](#database-diagram)
  - [System Architecture](#system-architecture)
- [Technologies 🐉](#technologies-)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
- [Task progress ✅](#task-progress-)
- [Run Application ▶️](#run-application-)
  - [1. Play with Microsoft Visual Studio SDK](#1-play-with-microsoft-visual-studio-sdk)
  - [2. Play with our live website](#2-play-with-our-live-website)
- [End 👋](#end-)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Summary 🐣

This is an simple web application of patients managements.

# Analysis problem and Solution 🧐

## Problem

https://docs.google.com/document/d/1mCDD8p3cwsm0-f2eaYmEZvbG8_habWmfu8ettW75Sak/edit

## Analysis

https://docs.google.com/document/d/1qS_FNeMV1ET0WMmXS-C8AspC77MiE0mUsBlE6t0WTFU/edit

## My solution

- Users up to 100K and possibly more -> Replication and cache to minimize query time
- At the same time, it is also necessary to optimize queries -> Database Tuning approach is so necessary
- Security: Patient data must be kept confidential, only authorized persons can access sensitive information.
- The user interface must be friendly and easy to use for both medical staff and patients.
- Perform regular backups and have a recovery plan after incidents. Write a data backup script

# Architecture 📑

## Database diagram

![Untitled](https://github.com/user-attachments/assets/cc99a717-4525-4db7-ae98-f5b7fc91a2c9)

## System Architecture

![image](https://github.com/user-attachments/assets/ba8a1459-fcf8-4705-a522-019d73d3e7af)

# Technologies 🐉

---

## Front-End

- React
- Redux
- MUI
- Bootstrap
- Deploy & CI: Vercel

🔗Link test Front-End: [Link](https://fe-chi-rouge.vercel.app/)

🔗Link repo Front-End: [Link](https://github.com/Thuytrinhne/patient-management-fe)

<p align="center">
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSg1MndL-Xp1JcnqaB0YOqTp6zDjrwYyGKsPA&s" alt="React" width="100"/>
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwh-2btrw1P54k-yIKqG_lsB_SVc48vGzWZQ&s" alt="Redux" width="100"/>
  <img src="https://yt3.googleusercontent.com/bAPgcc0NUsnRyyikb_X6cz4Wdv4vFGZ0PvdAZs6dHgeMjXcau5AM7aFqdFxzP_UBXlbwiBg4=s900-c-k-c0x00ffffff-no-rj" alt="MUI" width="100"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/800px-Bootstrap_logo.svg.png" alt="Bootstrap" width="100"/>
  <img src="https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png" alt="Vercel" width="100"/>
</p>

## Back-End

- ASP.NET core 8.0
- Postgres and Entity Framework
- Redis Cache
- Deploy: Gg cloud, Azure
- CI: Github action

🔗Link test api: [Link](https://hospital-api-f6c5exhyheg3abfd.southeastasia-01.azurewebsites.net)

🔗Link repo Back-end: [Link](https://github.com/Thuytrinhne/patient-management-be)

<p align="center">
  <img src="https://www.pragimtech.com/wp-content/uploads/2019/04/aspnet.png" width="100" />
  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUmnFYeOmmAlNV9_ZTu5cYgS2L55Q1pt9QyA&s" width="100" />
  <img src="https://netcore.vn/uploads/media/7938987e-d3f0-4f9e-8530-16571dca4639.png" width="100" />
  <img src="https://www.tothenew.com/blog/wp-ttn-blog/uploads/2023/09/redis_logo-1.png" width="100" />
  <img src="https://techvccloud.mediacdn.vn/280518386289090560/2021/9/1/google-cloud-la-gi-16304808306551940059468-0-14-315-575-crop-16304808366241927824846.jpg" width="100" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Microsoft_Azure.svg/1200px-Microsoft_Azure.svg.png" width="100" />
  <img src="https://media.dev.to/cdn-cgi/image/width=1080,height=1080,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fft4iy3x3bugjdroygk1b.png" width="100" />
</p>

# Task progress ✅

👨‍💻**Front-End**:

- [x] Design UX/UI

- [x] Develop HTML & CSS templates

- [ ] Integrate APIs (A partial Api've just intergrarted)

- [x] Enhance search performance on pages

- [x] Implement security measures

💻**Back-End**:

- [x] Data migration

- [x] Seed data for 100K patients, 200K contacts, and 200K addresses as requested

- [x] Build APIs

- [x] Document APIs with Swagger

- [x] Deploy application

- [x] Implement automatic backup

- [x] Implement caching to enhance performance when querying 100K patients
    
- [x] Unit testing (xunit+moq) for Controllers and main services

- [ ] Rate limiting

# Run Application ▶️

## 1. Play with Microsoft Visual Studio SDK

- B1: Clone the git project
- B2: Click on the `PatientManagementApi.sln`
- B3: Choose the profile for running you want
- B4: Run and if the swagger doc appear, that is successful

## 2. Play with our live website

Click on the [Link](https://fe-chi-rouge.vercel.app/)

Use: 

UserName: 21522719@gm.uit.edu.vn

Password: Rj123456@

# End 👋

---

Thanks for Novobi Company
