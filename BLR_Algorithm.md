| Algorithm type     | Environment suitability                  | Hardware demand | Key strengths                    | Key limitations              |
| ------------------ | ---------------------------------------- | --------------- | -------------------------------- | ---------------------------- |
| Graph/Optimisation | Large, complex, loop closures needed     | Moderate-high   | High consistency, loop closure   | More compute, memory         |
| LiDAR-based        | Outdoor, large open spaces, poor visuals | High            | Accurate geometry, robust scenes | Costly sensor, heavy compute |

## Final Algorithm: Graph/Optimisation (GMapping)

**Mechanism**: Represent poses and landmarks (or scans) as nodes in a graph; edges represent constraints (observations or odometry). Then solve for maximum-likelihood / least-squares for poses & map. 

**Strengths**: Very good consistency, handles loop-closures well, scalable with sparse solvers.

**Configurations:**

- **ROS2 Humble** on **Ubuntu 22.04 Desktop (RPi 5)**
- **YDLIDAR X3 Pro** using **official YDLIDAR ROS2 driver**
- **Pure LiDAR mapping** (no odometry)
- **SLAM = GMapping (ROS2 port)**
- **Standard names** (`/scan`, `laser_frame`)
- **Mapping-only**
- **Map saved as .pgm + .yaml**

| Term                | What it is                                       | Example       |
| ------------------- | ------------------------------------------------ | ------------- |
| **scan topic name** | ROS "channel" that sends out LiDAR scan data     | `/scan`       |
| **frame id**        | Name of coordinate frame the LiDAR is mounted in | `laser_frame` |

- Drive once to build the map
- Save the map
- Later load that map and **not run SLAM again** — just display or use it

## Implementation

#### 1) Install ROS2 Humble on Ubuntu 22.04 (Desktop)

```bash
sudo apt update && sudo apt upgrade -y

sudo apt install -y locales
sudo locale-gen en_US en_US.UTF-8
export LANG=en_US.UTF-8

sudo apt install -y software-properties-common
sudo add-apt-repository universe

sudo apt update && sudo apt install curl -y
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key \
    -o /usr/share/keyrings/ros-archive-keyring.gpg

echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(lsb_release -cs) main" \
| sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

sudo apt update
sudo apt install -y ros-humble-desktop
```

Add to .bashrc:

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

------

#### 2) Create ROS2 workspace

```bash
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws
colcon build
source install/setup.bash
```

------

#### 3) Install YDLIDAR ROS2 driver (official)

```bash
cd ~/ros2_ws/src
git clone https://github.com/YDLIDAR/ydlidar_ros2_driver.git
cd ~/ros2_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build
source install/setup.bash
```

------

#### 4) Test LiDAR and verify /scan in RViz2

Run driver:

```bash
ros2 launch ydlidar_ros2_driver ydlidar_launch.py
```

In another terminal:

```bash
rviz2
```

Set display → Add → LaserScan → topic `/scan`

Confirm live scans visible.

------

#### 5) Install and run GMapping (ROS2 port)

```bash
cd ~/ros2_ws/src
git clone https://github.com/Project-MANAS/openslam_gmapping.git
cd ~/ros2_ws
rosdep install --from-paths src --ignore-src -r -y
colcon build
source install/setup.bash
```

Run GMapping with LiDAR-only:

```bash
ros2 run slam_gmapping slam_gmapping  scan:=/scan
```

Drive robot to map the library.

------

#### 6) Save the map (.pgm + .yaml)

When mapping is complete:

```bash
ros2 run nav2_map_server map_saver_cli -f ~/map_library
```

This will create:

```
map_library.pgm
map_library.yaml
```

------

#### 7) Load the map later (without SLAM)

Launch map server:

```bash
ros2 run nav2_map_server map_server --ros-args -p yaml_filename:=~/map_library.yaml
```

------

#### Next available tasks if you want (say “next: ”)

1. Provide a **single combined launch file** (LiDAR + GMapping + RViz)
2. Create a **service to auto-save latest map periodically**
3. Add **Raspberry-Pi auto-startup service**
4. Add **Wi-Fi remote viewing from laptop RViz**
5. Integrate **localisation without remapping**

Say for example:

```
next: 1
```

**Chat History: ** https://chatgpt.com/share/68ff5648-e7c0-8002-ae9b-8e38597c8f72
