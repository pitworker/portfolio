# Postcards from Next

Installed August 2023

Created with Deeplocal for Google

## Overview

To show off Google's Cloud AI tools, Deeplocal built a collection of interactive installations for Cloud Next 2023. I took the role of software lead and primary developer for one of these installations, *Postcards from Next*. Harnessing Google's PaLM and Imagen AI models, the installation prompts event visitors to type in a memory from their visit to San Francisco and pick a text/image style before generating a custom illustration and message for a unique printed postcard. Visitors could then mail their postcards to a recipient of their choice.

| ![Postcards from Next](/content/ai-postcards/images/postcard-wide.jpg "Postcards from Next") | ![Selecting generated image options](/content/ai-postcards/images/postcard-select.jpg "Selecting generated images options") |
| --- | --- |
| ![A printed postcard](/content/ai-postcards/images/postcard-print.jpg "A printed postcard") | ![Mailing the postcard](/content/ai-postcards/images/postcard-mail.jpg "Mailng the postcard") |

## Architecture and Process

*Postcards from Next*'s software platform consists of a native Windows app frontend built with NextJS and Electron and a server built with NodeJS. The server handles the state, parsing of all user input, making all queries to the AI models, and formatting and executing postcard prints. The backend serves a REST API to the frontend and makes calls to the Vertex AI models directly through Google Cloud's API. The kiosk contains two different printers, one to print the graphics on the postcard's front, and one to print a sticker containing the message for the postcard's back. The backend writes formatted the front illustration and backside sticker to PDF files, then spawns a PowerShell script that and pushes a new job for each PDF to its respective printer using Adobe Acrobat's CLI.

As software lead, I designed the software architecture and built the entire backend along with a siginificant portion of the frontend.