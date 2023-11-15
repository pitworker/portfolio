# Lollipop Licker

Completed Fall 2018

In collaboration with [Paul Park](https://paukparl.com/)

## Background

There isn't really that much to explain about this project—it's a robot that licks lollipops down to their sticks and makes an absolute mess while doing it. It senses when a lollipop is placed into it, and, using a sponge wetted from a trough of water, licks the lollipop until only the stick remains. The intentional lack of a runoff collection system leads to a pool of liquid lollipop to spread all over the table. Inspiration for this piece rose entirely from a conversation my collaborator, Paul, and I had about possible robots we could build centering objects from a bag of disparate items we'd collected from the Pittsburgh Center for Creative Reuse.

::youtube[lollipop-licker]{#DW7IsEc858w}

![Photograph of the robot without a lollipop](/content/lollipop-licker/images/lick.jpg "Photograph of the robot without a lollipop")

The tongue is powered by a servo motor, and the spinning lollipop is powered by a stepper motor. The robot senses when a lollipop has been placed into it using a infrared distance sensor. The sensor, motor, and servo are all connected to an Arduino with a motor shield mounted on it. All of the electronics are encased within the black acrylic shell and are mounted above the water trough to keep them dry.