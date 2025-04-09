
import { useEffect } from 'react';
import { useSeatStore } from '../../store/seatStore';
import Seat from './Seat';

const SeatMap = () => {
  const { seats, initializeSeats } = useSeatStore();
  
  useEffect(() => {
    initializeSeats();
  }, [initializeSeats]);
  
  // Group seats by row for display
  const seatsByRow = seats.reduce<Record<number, typeof seats>>((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {});
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Select Your Seats</h2>
      
      <div className="mb-6">
        <div className="flex gap-4 items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className="seat-available w-6 h-6"></div>
            <span className="text-sm">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat-selected w-6 h-6"></div>
            <span className="text-sm">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="seat-booked w-6 h-6"></div>
            <span className="text-sm">Booked</span>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => (
          <div key={rowNum} className="flex gap-2 justify-center">
            <div className="min-w-8 flex items-center justify-center text-gray-500 text-sm font-medium">
              Row {rowNum}
            </div>
            <div className="flex gap-2">
              {rowSeats.map(seat => (
                <Seat key={seat.id} seat={seat} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatMap;
