
import { Seat } from '../types';

// Generate the initial seats (80 seats, 7 per row, last row has 3)
export const generateSeats = (): Seat[] => {
  const seats: Seat[] = [];
  const totalRows = 12; // 11 full rows + 1 partial row
  
  for (let row = 1; row <= totalRows; row++) {
    const seatsInRow = row === totalRows ? 3 : 7; // Last row has 3 seats
    
    for (let seatNum = 1; seatNum <= seatsInRow; seatNum++) {
      const seatId = (row - 1) * 7 + seatNum;
      seats.push({
        id: seatId,
        row,
        seatNumber: seatNum,
        status: 'available'
      });
    }
  }
  
  return seats;
};

// Find the best seats based on the booking rules
export const findBestSeats = (availableSeats: Seat[], count: number): number[] => {
  if (count > 7) return []; // Max 7 seats per booking
  if (count <= 0) return [];
  
  // Group available seats by row
  const seatsByRow = availableSeats.reduce<Record<number, Seat[]>>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});
  
  // First priority: Find a row with enough consecutive seats
  for (const row in seatsByRow) {
    if (seatsByRow[row].length >= count) {
      // Sort seats by seat number to ensure we get consecutive seats
      const rowSeats = [...seatsByRow[row]].sort((a, b) => a.seatNumber - b.seatNumber);
      
      // Check for consecutive seats in this row
      for (let i = 0; i <= rowSeats.length - count; i++) {
        let isConsecutive = true;
        for (let j = 0; j < count - 1; j++) {
          if (rowSeats[i + j].seatNumber + 1 !== rowSeats[i + j + 1].seatNumber) {
            isConsecutive = false;
            break;
          }
        }
        
        if (isConsecutive) {
          return rowSeats.slice(i, i + count).map(seat => seat.id);
        }
      }
      
      // If no consecutive seats but enough total seats, return them anyway
      return rowSeats.slice(0, count).map(seat => seat.id);
    }
  }
  
  // Second priority: Find nearby seats across rows
  // Sort all available seats by row and seat number
  const sortedSeats = [...availableSeats].sort((a, b) => {
    if (a.row === b.row) {
      return a.seatNumber - b.seatNumber;
    }
    return a.row - b.row;
  });
  
  return sortedSeats.slice(0, count).map(seat => seat.id);
};
