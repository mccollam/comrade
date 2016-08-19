comrade
=======

A general purpose alarm clock computer, similar to a [Chumby](https://www.wikiwand.com/en/Chumby)

Current status:
---------------
* Home button works, returning to main menu from any applet
* Function buttons are available from applets and can be redefined in each applet.  (They remain functional only while an applet is loaded, being cleared when returning home.)

Todo:
-----
* Hook up display button functionality
* Don't pin to specific electron version (once the [upstream bug](https://github.com/electron/electron/issues/5851) is fixed)

Bugs:
-----
* Too easy to drag instead of click buttons on screen
* White flash/long delay when switching apps

Ideas:
------
 * Prestart various applets and just show them when launched?  (Would increase startup speed at the expense of memory/CPU usage, so should probably make this optional within applets)
