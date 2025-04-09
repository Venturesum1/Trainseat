
export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Seat {
  id: number;
  row: number;
  seatNumber: number;
  status: SeatStatus;
  bookedBy?: string;
}

export type SeatStatus = 'available' | 'selected' | 'booked';

export interface BookingRequest {
  userId: string;
  seats: number[];
}
