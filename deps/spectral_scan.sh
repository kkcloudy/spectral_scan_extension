#!/bin/sh /etc/rc.common

USE_PROCD=1
START=50

start_service() {
        procd_open_instance spectral_scan
        procd_set_param command /usr/bin/spectral_scan
        procd_set_param respawn ${respawn_threshold:-300} ${respawn_timeout:-5} ${respawn_retry:-30000}
        procd_close_instance
}
