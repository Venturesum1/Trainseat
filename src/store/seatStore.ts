
import { create } from 'zustand';
import { Seat } from '../types';
import { generateSeats, findBestSeats } from '../utils/seatHelpers';

interface SeatState {
  seats: Seat[];
  selectedSeats: number[];
  numberOfSeats: number;
  initializeSeats: () => void;
  selectSeat: (seatId: number) => void;
  deselectSeat: (seatId: number) => void;
  clearSelection: () => void;
  bookSelectedSeats: (userId: string) => void;
  setNumberOfSeats: (count: number) => void;
  autoSelectSeats: () => void;
  resetAllBookings: () => void;
}

export const useSeatStore = create<SeatState>((set, get) => ({
  seats: [],
  selectedSeats: [],
  numberOfSeats: 1,
  
  initializeSeats: () => {
    set({ seats: generateSeats() });
  },

  selectSeat: (seatId: number) => {
    const { seats, selectedSeats } = get();
    
    if (selectedSeats.length >= 7) {
      return; // Maximum 7 seats per booking
    }
    
    if (selectedSeats.includes(seatId)) {
      return; // Already selected
    }
    
    const seatIndex = seats.findIndex(seat => seat.id === seatId);
    if (seatIndex !== -1 && seats[seatIndex].status === 'available') {
      const updatedSeats = [...seats];
      updatedSeats[seatIndex] = { ...updatedSeats[seatIndex], status: 'selected' };
      
      set({ 
        seats: updatedSeats,
        selectedSeats: [...selectedSeats, seatId]
      });
    }
  },

  deselectSeat: (seatId: number) => {
    const { seats, selectedSeats } = get();
    
    const seatIndex = seats.findIndex(seat => seat.id === seatId);
    if (seatIndex !== -1 && seats[seatIndex].status === 'selected') {
      const updatedSeats = [...seats];
      updatedSeats[seatIndex] = { ...updatedSeats[seatIndex], status: 'available' };
      
      set({ 
        seats: updatedSeats,
        selectedSeats: selectedSeats.filter(id => id !== seatId)
      });
    }
  },

  clearSelection: () => {
    const { seats, selectedSeats } = get();
    
    const updatedSeats = [...seats];
    selectedSeats.forEach(seatId => {
      const seatIndex = updatedSeats.findIndex(seat => seat.id === seatId);
      if (seatIndex !== -1) {
        updatedSeats[seatIndex] = { ...updatedSeats[seatIndex], status: 'available' };
      }
    });
    
    set({ seats: updatedSeats, selectedSeats: [] });
  },

  bookSelectedSeats: (userId: string) => {
    const { seats, selectedSeats } = get();
    if (selectedSeats.length === 0) return;
    
    const updatedSeats = [...seats];
    selectedSeats.forEach(seatId => {
      const seatIndex = updatedSeats.findIndex(seat => seat.id === seatId);
      if (seatIndex !== -1) {
        updatedSeats[seatIndex] = { 
          ...updatedSeats[seatIndex], 
          status: 'booked',
          bookedBy: userId
        };
      }
    });
    
    set({ seats: updatedSeats, selectedSeats: [] });
  },

  setNumberOfSeats: (count: number) => {
    set({ numberOfSeats: count });
  },

  autoSelectSeats: () => {
    const { seats, numberOfSeats, clearSelection } = get();
    if (numberOfSeats <= 0 || numberOfSeats > 7) return;
    
    clearSelection();
    
    const availableSeats = seats.filter(seat => seat.status === 'available');
    const bestSeats = findBestSeats(availableSeats, numberOfSeats);
    
    bestSeats.forEach(seatId => {
      get().selectSeat(seatId);
    });
  },

  resetAllBookings: () => {
    const { seats } = get();
    const resetSeats = seats.map(seat => ({
      ...seat,
      status: 'available',
      bookedBy: undefined
    }));
    
    set({ seats: resetSeats, selectedSeats: [] });
  }
}));
