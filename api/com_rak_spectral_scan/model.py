from euci import EUci
import random
import csv
import wgrt.util as wgu
from datetime import datetime
import sqlite3

def start_service():
    cmd = "/etc/init.d/sx130x_lora_pkt_fwd stop"                                                  
    wgu.shell.execute(cmd, 40)
    cmd = "/etc/init.d/sx130x_station stop"                                                  
    wgu.shell.execute(cmd, 40) 
    cmd = "/etc/init.d/spectral_scan start"
    wgu.shell.execute(cmd, 40)

def stop_service():
    cmd = "/etc/init.d/spectral_scan stop"
    ret = wgu.shell.execute(cmd, 40)
    cmd = "/etc/init.d/sx130x_lora_pkt_fwd start"
    wgu.shell.execute(cmd, 40)
    cmd = "/etc/init.d/sx130x_station start"
    wgu.shell.execute(cmd, 40)

def get_config_func():
    uci = EUci()
                                                                                                                                                                                                                                              
    data = {
        'enable': uci.get("spectral_scan", "spectral_scan", "enable") == "true",
        'start_frequency': uci.get("spectral_scan", "spectral_scan", "start_frequency"),
        'channel_number': uci.get("spectral_scan", "spectral_scan", "channel_number"),
        'step': uci.get("spectral_scan", "spectral_scan", "step")

    }                                                       
                                                                                                                                            
    return data

def set_config_func(conf):
    uci = EUci()
    if conf['enable'] is True:
        uci.set("spectral_scan", "spectral_scan", "enable", "true")
        uci.set("spectral_scan", "spectral_scan", "start_frequency", conf["start_frequency"])
        uci.set("spectral_scan", "spectral_scan", "channel_number", conf["channel_number"])
        uci.set("spectral_scan", "spectral_scan", "step", conf["step"])
        uci.commit("spectral_scan", "spectral_scan")
        start_service()
    else:
        uci.set("spectral_scan", "spectral_scan", "enable", "false")
        uci.commit("spectral_scan", "spectral_scan")
        stop_service()

    return {"save": "success"}

def get_current_data():

    x_axis = []
    y_axis = []
    data = []

    conn = sqlite3.connect('/mnt/mmcblk0p1/spectral_scan.db')
    conn.execute("PRAGMA journal_mode=WAL")
    cursor = conn.cursor()
    cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='scan_configs'")                         
    row = cursor.fetchone()
    if row[0] > 0:
        cursor.execute("SELECT * FROM scan_configs ORDER BY id DESC LIMIT 1")
        max_id_row = cursor.fetchone()
        if max_id_row is not None:
            id = max_id_row[0]
            start_freq = max_id_row[1] / 1000
            step = max_id_row[2] / 1000
            channel_num = max_id_row[3]

            x_axis = [start_freq + i * step for i in range(channel_num)]

            cursor.execute(f"SELECT * FROM scan_results_{id}")
            data_rows = cursor.fetchall()

                                             
            for row in data_rows:        
                y_axis.append(row[-1])
                for x in range(channel_num):
                    data.append([x, row[0]-1, row[x+1] * -4 - 11])

    cursor.close()
    conn.close()
    
    return {'xAxis': x_axis, 'yAxis': y_axis, 'curData': data}


def get_history_list():

    data = []

    conn = sqlite3.connect('/mnt/mmcblk0p1/spectral_scan.db')
    conn.execute("PRAGMA journal_mode=WAL")
    cursor = conn.cursor()
    cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='scan_configs'")
    row = cursor.fetchone()
    if row[0] > 0:
        cursor.execute("SELECT * FROM scan_configs")
        data_rows = cursor.fetchall()

        for row in data_rows:
            data.append({'id': row[0], 'start_freq': row[1], 'step': row[2], 'channel_num': row[3], 'time': row[4]})

    cursor.close()
    conn.close()

    return data

def get_history_data(id):

    x_axis = []                                                                                                     
    y_axis = []                                                                                                     
    data = []                                                
                                                                                             
    conn = sqlite3.connect('/mnt/mmcblk0p1/spectral_scan.db')
    conn.execute("PRAGMA journal_mode=WAL")
    cursor = conn.cursor()
    cursor.execute("SELECT count(*) FROM sqlite_master WHERE type='table' AND name='scan_configs'")                 
    row = cursor.fetchone()                                                                                         
    if row[0] > 0:                                                  
        cursor.execute(f"SELECT * FROM scan_configs WHERE id={id}")                    
        max_id_row = cursor.fetchone()                                                                                                                                  
        start_freq = max_id_row[1] / 1000                                                        
        step = max_id_row[2] / 1000                                                              
        channel_num = max_id_row[3]                                                              
                                                                                             
        x_axis = [start_freq + i * step for i in range(channel_num)]                             
                                                                                             
        cursor.execute(f"SELECT * FROM scan_results_{id}")                                       
        data_rows = cursor.fetchall()

        for row in data_rows:                                                                                       
            y_axis.append(row[-1])                                                                                  
            for x in range(channel_num):                                                                            
                data.append([x, row[0]-1, row[x+1] * -4 - 11])                                                      
                                                                                                                
        cursor.close()                                                                                              
        conn.close()                                                                                                
                                                                                                                
    return {'xAxis': x_axis, 'yAxis': y_axis, 'curData': data} 
