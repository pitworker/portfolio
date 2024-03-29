# Moderation Workstation

Installed in Los Angeles, CA January 2021

Installed in Dublin, Ireland November 2022

Installed in Singapore Spring 2023

Yet to be installed in Washington, DC

Created with Deeplocal for TikTok

![The Moderation Workstation](/content/moderation-workstation/images/mws-kiosks.JPG "The Moderation Workstation")

## Background

For TikTok's Transparency and Accountability Centers, Deeplocal designed, developed, and fabricated a suite of four interactive exhibits to demonstrate different key points of TikTok's accountability strategy. I acted as the sole software developer for one of these exhibits, the *Moderation Workstation*. Designed to highlight TikTok's moderation process, the exhibit consists of three kiosks that allow Center visitors to simulate the experience of moderating the site. Visitors see examples of content that might get flagged for review, select any policies violated by that piece of content, and see an explanation of the TikTok team's determination on the content.

| ![Using the Moderation Workstation](/content/moderation-workstation/images/mws-back.JPG "Using the Moderation Workstation") | ![Using the Moderation Workstation](/content/moderation-workstation/images/mws-shoulder.JPG "Using the Moderation Workstation") |
| --- | --- |

Developed to be easily maintained, the exhibit features a full content management system through which TikTok's team can swap out content, update community guidelines and policies, and tailor the experience as their standards change with time or to suit specific localities. Given TikTok's global reach, the exhibits are also designed to fully support dozens of languages.

![Managing content on the Moderation Workstation](/content/moderation-workstation/images/mws-manage.JPG "Managing content on the Moderation Workstation")

## Architecture and Process

The *Moderation Workstation*'s software runs as a native Electron application in Windows. The application runs without a standalone local server, instead nearly everything, including state, operates from Electron's frontend context. Aside from some logic defining the app's startup behavior, the only piece of the application handled in the main context is the communication with the remote exhibit management server.

The content management system for the exhibit is built with Strapi and provides a platform through which TikTok's team can independently edit and deploy content to the exhibits without needing to involve the Deeplocal team. While any changes to the interface's design or user flow would require a redesign/development from Deeplocal, everything else, including the sample violations, community guidelines, introduction content, even all the button labels can be changed by the client at-will.

In addition to being the sole developer on the *Moderation Workstation* for everything but the implementation of multi-language support (which only began between the Dublin and Singapore installs), I also built out a system for standardizing and configuring the computers in the exhibits for the TAC. Each exhibit uses the same model of computer setup with identical file structures, even with the applications for all of the exhibits loaded onto them. Each computer boots into a Batch script that references a single configuration file to determine which exhibit application to launch. By provisioning all the machines this way, we were able to ship a single spare computer to each TAC that can serve as a drop-in replacement for any exhibit, with the only software setup needed being an edit to a single line of a single file.
