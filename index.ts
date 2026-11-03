export interface RSVPRecord {
  id: string;
  fullName: string;
  contactNumber?: string;
  attendance: 'attending' | 'declined';
  guestCount: number;
  dietaryRequirements?: string;
  message?: string;
  submittedAt: string;
}

export interface GuestBookEntry {
  id: string;
  authorName: string;
  relationship: string;
  location?: string;
  message: string;
  blessingTag?: 'traditional' | 'love' | 'family' | 'prosperity';
  status: 'approved' | 'pending' | 'hidden';
  isPinned?: boolean;
  likes: number;
  createdAt: string;
}

export type ActiveTab = 
  | 'invitation'
  | 'countdown'
  | 'location'
  | 'programme'
  | 'celebration'
  | 'guestbook'
  | 'rsvp';

export interface RouteOption {
  originName: string;
  distanceKm: number;
  estimatedHours: string;
  viaRoads: string;
  instructions: string[];
  coordinates: [number, number]; // lat, lng
}
