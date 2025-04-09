
import { useSeatStore } from '../../store/seatStore';
import { Seat as SeatType } from '../../types';
import { cn } from '@/lib/utils';

interface SeatProps {
  seat: SeatType;
}

const Seat = ({ seat }: SeatProps) => {
  const { selectSeat, deselectSeat, selectedSeats } = useSeatStore();
  
  const handleClick = () => {
    if (seat.status === 'available') {
      selectSeat(seat.id);
    } else if (seat.status === 'selected') {
      deselectSeat(seat.id);
    }
  };
  
  // Helper to get proper class names based on seat status
  const getSeatClasses = () => {
    const isSelected = selectedSeats.includes(seat.id);
    const status = isSelected ? 'selected' : seat.status;
    
    return cn(
      'seat',
      status === 'available' && 'seat-available',
      status === 'selected' && 'seat-selected',
      status === 'booked' && 'seat-booked'
    );
  };
  
  return (
    <div 
      className={getSeatClasses()}
      onClick={handleClick}
      title={`Row ${seat.row}, Seat ${seat.seatNumber}`}
    >
      {seat.id}
    </div>
  );
};

export default Seat;
