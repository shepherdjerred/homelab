# Zeus Bootstrap
This module creates an ignition config that can be combined with a Core OS installer to create an unattended installer for the Zeus server. Reinstalling the server should require the extremely simple steps of:

1. Download the latest stable CoreOS .iso file
2. Run `make iso.build` in `zeus/`
3. Flash a USB with the resulting .iso
4. Plug in the USB and boot the Zeus server

The Zeus server will automatically fetch and install the ignition config from GitHub. No further work is required.
