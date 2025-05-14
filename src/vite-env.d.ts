/// <reference types="vite/client" />

interface VimeoPlayerEvent {
  // Define specific event properties if needed, e.g., duration, percent, seconds
  [key: string]: any;
}

// This interface defines the instance of the Vimeo Player
interface VimeoPlayerInstance {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  ready: () => Promise<void>;
  on: (event: string, callback: (data: VimeoPlayerEvent) => void) => void;
  off: (event: string, callback?: (data: VimeoPlayerEvent) => void) => void;
  loadVideo: (id: number | string) => Promise<void>;
  destroy: () => Promise<void>; // Added destroy method
  // Add other methods you might use from the Vimeo Player API
  // For example:
  // getVolume: () => Promise<number>;
  // setVolume: (volume: number) => Promise<void>;
  // getCurrentTime: () => Promise<number>;
  // setCurrentTime: (seconds: number) => Promise<number>;
  // getDuration: () => Promise<number>;
  // destroy: () => Promise<void>;
}

// This interface defines the constructor for the Vimeo Player
interface VimeoPlayerConstructor {
  new (element: HTMLIFrameElement | HTMLElement | string, options?: any): VimeoPlayerInstance;
}

// This interface represents the global Vimeo SDK object
interface VimeoSDK {
  Player: VimeoPlayerConstructor;
  // Add other SDK parts if necessary, e.g., Video, TextTrack, etc.
}

interface Window {
  Vimeo?: VimeoSDK; // window.Vimeo is an object containing the Player constructor
}
