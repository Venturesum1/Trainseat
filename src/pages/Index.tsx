
import { useEffect } from 'react';
import Header from '../components/Layout/Header';
import AuthModal from '../components/Auth/AuthModal';
import SeatMap from '../components/SeatMap/SeatMap';
import BookingForm from '../components/Booking/BookingForm';
import { useAuthStore } from '../store/authStore';
import { toast } from 'sonner';

const Index = () => {
  const { isAuthenticated } = useAuthStore();
  
  useEffect(() => {
    toast.message(
      "Welcome to TrainSeatEasy!", 
      { 
        description: "You can book up to 7 seats at a time. Select seats or use auto-select." 
      }
    );
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <AuthModal />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Train Seat Reservation</h1>
          <p className="text-gray-600 text-center mb-8">
            Book your seats for a comfortable journey
          </p>
          
          {!isAuthenticated && (
            <div className="mb-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-blue-700">
                <span className="font-medium">Note:</span> You need to be logged in to complete a booking.
                You can still browse available seats.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <SeatMap />
            </div>
            <div>
              <BookingForm />
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white shadow-inner py-6">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} TrainSeatEasy - A Train Seat Reservation Demo
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
