# Boilerplate code, which pulls in the Zephyr build system.
cmake_minimum_required(VERSION 3.13.1)
include($ENV{ZEPHYR_BASE}/cmake/app/boilerplate.cmake NO_POLICY_SCOPE)
project(hardware_test)

# Add your source file to the "app" target. This must come after
# the boilerplate code, which defines the target.
target_sources(app PRIVATE src/main.c)
target_sources(app PRIVATE src/drivers/led.c)
target_sources(app PRIVATE src/drivers/buttons.c)
target_sources(app PRIVATE src/drivers/vibration_motor.c)
target_sources(app PRIVATE src/drivers/neopixels.c)
target_sources(app PRIVATE src/drivers/display.c)
target_sources(app PRIVATE src/drivers/battery_voltage.c)
target_sources(app PRIVATE src/drivers/sound.c)
target_sources(app PRIVATE src/ble_service.c)
