from euci import EUci
import random
import csv
import wgrt.util as wgu
from datetime import datetime

def generate_data(conf):
   
    rssi_offset = conf['rssi_offset']
    start_freq = conf['start_frequency']
    nb_channel = conf['channel_number']
    nb_point = conf['point_number']
    nb_scan = 5
    nb_rssi = 32
    
    xaxis = [str(round(start_freq + i * 0.2, 1)) for i in range(nb_channel)]
    yaxis = []
    tmp = [[0 for _ in range(nb_channel)] for _ in range(nb_rssi)]
    truncate = []
    data = []
    max_idx = 0
    min_idx = 32


    for i in range(nb_scan):

        cmd = f"/usr/bin/sx130x/spectral_scan -u -d /dev/ttyACM0 -f {start_freq} -n {nb_channel} -s {nb_point} -o {rssi_offset} -l /tmp/{i}"
        ret = wgu.shell.execute(cmd, 40)

        file_name = f"/tmp/{i}.csv"
        with open(file_name, mode='r') as file:
            cnt = 0
            csv_reader = csv.reader(file)
            for row in csv_reader:
                for idx in range(nb_rssi):
                    value = int(row[idx * 2 + 2])
                    tmp[idx][cnt] += value
                cnt += 1

    for i in range(nb_rssi):
        for j in range(nb_channel):
            if tmp[i][j] > 0:
                occupancy = int(tmp[i][j] / nb_scan / nb_point * 100)
                tmp[i][j] = occupancy
                if i > max_idx:
                    max_idx = i
                if i < min_idx:
                    min_idx = i

    for i in range(max_idx + 4, min_idx -3, -1):
        truncate.append(tmp[i])
        yaxis.append(str(rssi_offset - i * 4))

    for x in range(nb_channel):
        for y in range(len(yaxis)):
            arr = [x, y, truncate[y][x]]
            data.append(arr)

    current_time = datetime.now()
    current_time_str = current_time.strftime('%Y%m%d%H%M%S')
    converted_time_str = current_time.strftime('%Y-%m-%d %H:%M:%S')
    item = [ current_time_str, start_freq, nb_channel, rssi_offset, max_idx, min_idx ]
    history_file = '/tmp/history.csv'

    with open(history_file, mode='a', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(item)

    csv_file = f'/tmp/{current_time_str}.csv'

    with open(csv_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        for row in data:
            writer.writerow(row)

    return {'xaxis': xaxis, 'yaxis': yaxis, 'data': data, 'time': converted_time_str}

def get_history_list():
    
    data = []
    file_name = '/tmp/history.csv'
    with open(file_name, mode='r') as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                time_str = row[0]
                dt_obj = datetime.strptime(time_str, '%Y%m%d%H%M%S')
                time = dt_obj.strftime('%Y-%m-%d %H:%M:%S')
                start_freq = float(row[1])
                end_freq = start_freq + (int(row[2]) - 1) * 0.2,
                ht_obj = {'time': time, 'startFreq': start_freq, 'endFreq': end_freq, 'step': 0.2}
                data.append(ht_obj)

    return {'historyData': data}


def start_service():
    cmd = "/etc/init.d/spectral_scan start"
    ret = wgu.shell.execute(cmd, 40)

def stop_service():
    cmd = "/etc/init.d/spectral_scan stop"
    ret = wgu.shell.execute(cmd, 40) 
    
def get_enable_func():
    uci = EUci()

    data = {'enable': bool(int(uci.get("spectral_scan", "spectral_scan", "enable")))}

    return data

def set_enable_func(conf):
    uci = EUci()    

    if conf['enable'] is True:
        uci.set("spectral_scan", "spectral_scan", "enable", '1')
        start_service()
    else:
        uci.set("spectral_scan", "spectral_scan", "enable", '0')
        stop_service()
    uci.commit("spectral_scan", "spectral_scan")

    return {"save": "success"}

    item_file = None
    xaxis = []
    yaxis = []
    data = []
    file_name = '/tmp/history.csv'
    with open(file_name, mode='r') as file:
        csv_reader = csv.reader(file)
        for row in csv_reader:
            time_str = row[0]
            dt_obj = datetime.strptime(time_str, '%Y%m%d%H%M%S')
            time_conv = dt_obj.strftime('%Y-%m-%d %H:%M:%S')
            if time_conv == conf['time']:
                item_file = f'/tmp/{time_str}.csv'
                start_freq = float(row[1])
                nb_channel = int(row[2])
                rssi_offset = int(row[3])
                max_idx = int(row[4])
                min_idx = int(row[5])

                xaxis = [str(round(start_freq + i * 0.2, 1)) for i in range(nb_channel)]
                for i in range(max_idx + 4, min_idx -3, -1):
                    yaxis.append(str(rssi_offset - i * 4))

            
    if item_file is not None:
        with open(item_file, mode='r') as file:
            csv_reader = csv.reader(file)
            for row in csv_reader:
                tmp = []
                for item in row:
                    tmp.append(int(item))
                data.append(tmp)

    
    return {'xaxis': xaxis, 'yaxis': yaxis, 'data': data }





                

