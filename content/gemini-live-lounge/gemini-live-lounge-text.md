# Gemini Live Lounge

Launched February 2025

Created with Robot and Deeplocal for Google

## Overview

To show off the integrated Gemini Live features on Google's new Pixel 9 series phones, I owned end-to-end development of a mobile progressive web app (PWA) that integrated the Gemini and Speech-to-Text APIs to allow event visitors to generate custom magazine covers through a conversational user interface.

![Headline Generator kiosk](/content/gemini-live-lounge/images/kiosk-line.jpg "Headline Generator kiosk")

## Architecture

The *Headline Generator* for *Gemini Live Lounge* is a fullstack NextJS- and React-based PWA that integrates a conversational user interface, built with the Gemini API and Google Speech-to-Text, with a backend serving previously generated cover images and user information. Visitor IDs are tracked via browser-based NFC communication with around 200 event-provided guest Pixel devices.

| ![Provisioning guest Pixels](/content/gemini-live-lounge/images/swan-makes-phones.jpg "Provisioning guest Pixels") | ![Provisioned phone running Headline Generator PWA](/content/gemini-live-lounge/images/phone-close.jpg "Provisioned phone running Headline Generator PWA") |
| --- | --- |

## Role of *Headline Generator* in Event Experience

The *Gemini Live Lounge* was an integrated experience coinciding with the NBA All Stars event in San Francisco in 2025, drawing thousands of basketball fans for the experience's four-day activation timeline. Guests were provided with a loaner Pixel 9 Pro XL and used a customized Gemini experience on the phone to complete activities in within the event space leading to the creation of a custom-generated physical magazine featuring photos of the guest and AI-generated headlines and other content based on the guest's relationship and experience with the sport.

| ![Crowd outside the venue](/content/gemini-live-lounge/images/venue-crowd.jpg "Crowd outside the venue") | ![Crowd inside the venue](/content/gemini-live-lounge/images/inside-crowd.jpg "Crowd inside the venue") |
| --- | --- |

To create the headline for the magazine cover, Gemini (via the *Headline Generator* PWA) asks users about their hometown, their favorite aspects of the game, and the vibe they bring to the court. Using this information, Gemini then creates a unique phrase tailored to the visitor's answers to place on the cover.

| ![Headline Generator kiosk](/content/gemini-live-lounge/images/kiosk-close-01.jpg "Headline Generator kiosk") | ![Sample generated cover](/content/gemini-live-lounge/images/cover-generated-brent.png "Sample generated cover") | ![Magazines for pickup](/content/gemini-live-lounge/images/magazine-pickup.jpg "Magazines for pickup") |
| --- | --- | --- |