# The Postcard Maker @ Google Cloud Next

Installed August 2023

Created with Deeplocal for Google

## Overview

To show off Google's Cloud AI tools, Deeplocal built a collection of interactive installations for Cloud Next 2023. I took the role of software lead and primary developer for one of these installations, *The Postcard Maker*. Harnessing Google's PaLM and Imagen AI models, the installation prompts event visitors to type in a memory from their visit to San Francisco and pick a text/image style before generating a custom illustration and message for a unique printed postcard. Visitors could then mail their postcards to a recipient of their choice.

## Architecture and Process

*The Postcard Maker*'s software platform consists of a native Windows app frontend built with NextJS and Electron and a server built with NodeJS. The server handles the state, parsing of all user input, making all queries to the AI models, and formatting and spawning postcard prints. The backend serves a REST API to the frontend and makes calls to the Vertex AI models directly through Google Cloud's API. The kiosk contains two different printers, one to print the graphics on the postcard's front, and one to print a sticker containing the message for the postcard's back. The backend manages prints by generating PDFs for the two jobs, and then spawning a PowerShell script for each file that selects the printer and pushes a job to its queue using the Adobe Acrobat's CLI.

As software lead, I designed the software architecture and built the entire backend and a siginificant portion of the frontend.