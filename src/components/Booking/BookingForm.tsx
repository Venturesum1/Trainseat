
import { useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useSeatStore } from '../../store/seatStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const BookingForm = () => {
  const [numSeats, setNumSeats] = useState(1);
  const { isAuthenticated, user, toggleAuthModal } = useAuthStore();
  const { 
    selectedSeats, 
    bookSelectedSeats, 
    clearSelection, 
    setNumberOfSeats, 
    autoSelectSeats,
    resetAllBookings
  } = useSeatStore();
  
  const handleNumSeatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 7) {
      setNumSeats(value);
      setNumberOfSeats(value);
    }
  };
  
  const handleAutoSelect = () => {
    autoSelectSeats();
  };
  
  const handleBookSeats = () => {
    if (!isAuthenticated) {
      toggleAuthModal();
      return;
    }
    
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    
    bookSelectedSeats(user!.id);
    toast.success(`Successfully booked ${selectedSeats.length} seat(s)!`);
  };
  
  const handleClearSelection = () => {
    clearSelection();
  };
  
  const handleResetAll = () => {
    resetAllBookings();
    toast.success('All bookings have been reset');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Booking Options</h2>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="numSeats">Number of Seats (1-7)</Label>
          <Input
            id="numSeats"
            type="number"
            min={1}
            max={7}
            value={numSeats}
            onChange={handleNumSeatsChange}
          />
        </div>
        
        <div className="flex flex-col gap-3">
          <Button 
            variant="outline" 
            onClick={handleAutoSelect}
          >
            Auto-Select {numSeats} Seat(s)
          </Button>
          
          <Button
            variant="default"
            onClick={handleBookSeats}
            disabled={selectedSeats.length === 0}
          >
            Book {selectedSeats.length} Selected Seat(s)
          </Button>
          
          {selectedSeats.length > 0 && (
            <Button 
              variant="outline" 
              onClick={handleClearSelection}
            >
              Clear Selection
            </Button>
          )}
          
          <div className="border-t border-gray-200 my-2 pt-2">
            <Button
              variant="destructive"
              onClick={handleResetAll}
              className="w-full"
            >
              Reset All Bookings
            </Button>
          </div>
        </div>
        
        {selectedSeats.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-md">
            <h3 className="font-medium text-blue-700 mb-1">Selected Seats:</h3>
            <div className="text-blue-600">
              {selectedSeats.sort((a, b) => a - b).join(', ')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
