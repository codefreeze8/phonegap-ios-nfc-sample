cordova create xnfc --id "com.yourco.app" --name "XNFC"

Add Platforms
cordova platform add ios
cordova platform add android

Add Plugins:
cordova plugin add phonegap-nfc

Tweak config.xml file:
Add to android section of config.xml (to hide the bars)
<preference name="Fullscreen" value="true" />
Add to ios section of config.xml:
<preference name="BackupWebStorage" value="none" />

Android will detect and print tags as soon as they approach the reader; iOS requires pressing the 'Scan' button (android does NOT).

Enjoy! This tinkering helped me understand and get NFC working. Works well on iOS ;)

iOS does NOT give the tag serial number which honestly sucks. Come on Apple!

