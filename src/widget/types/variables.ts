export interface IMedia {
  artist: string;
  title: string;
  is_current_session: boolean;
  playback_info: {
    controls: {
      next_enabled: boolean;
      pause_enabled: boolean;
      play_enabled: boolean;
      prev_enabled: boolean;
      repeat_enabled: boolean;
      shuffle_enabled: boolean;
      stop_enabled: boolean;
      toggle_enabled: boolean;
    };
    is_shuffle: boolean;
    status:
      | "playing"
      | "paused"
      | "stopped"
      | "changing"
      | "opened"
      | "unknown";
  };
  player: {
    name: string;
    icon: number[];
  };
  player_id: string;
  thumbnail: number[];
  timeline_properties: {
    start_time: number;
    end_time: number;
    position: number;
  };
}

interface Battery {
  cycle_count: number;
  energy: number;
  energy_full: number;
  energy_full_design: number;
  energy_rate: number;
  model: string;
  serial_number: string;
  state: string;
  state_of_charge: number;
  state_of_health: number;
  technology: string;
  temperature_celsius: number | null;
  temperature_fahrenheit: number | null;
  temperature_kelvin: number | null;
  time_to_empty: number | null;
  time_to_full: number | null;
  vendor: string;
  voltage: number;
}

interface CpuSummary {
  brand: string;
  count: number;
  speed: number;
  usage: number;
}

interface CpuCore {
  brand: string;
  cpu_usage: number;
  frequency: number;
  name: string;
  vendor_id: string;
}

type DiskKind = "SSD" | "HDD" | { Unknown: number };

interface Disk {
  available_space: number;
  file_system: string;
  is_removable: boolean;
  kind: DiskKind;
  mount_point: string;
  name: string;
  total_space: number;
}

interface INetwork {
  download_speed_bytes: number;
  interface_name: string;
  ip_address: string[];
  ipv4_address: string;
  ipv6_address: string;
  packets_received: number;
  packets_transmitted: number;
  received_total: number;
  transmitted_total: number;
  upload_speed_bytes: number;
}

export interface ISystemInformation {
  batteries: Battery[];
  cpu: CpuSummary;
  cpus: CpuCore[];
  disks: Disk[];
  hostname: string;
  kernel_version: string;
  os_name: string;
  os_version: string;
  total_memory: number;
  used_memory: number;
  total_swap: number;
  used_swap: number;
  networks: INetwork[];
}

// Weather API TypeScript types

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
  city?: string;
  regionName?: string;
  timezone?: string;
  query?: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface Current {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

export interface WeatherResponse {
  location: Location;
  current: Current;
}
