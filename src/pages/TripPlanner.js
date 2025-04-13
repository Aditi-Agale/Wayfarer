import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plus } from 'lucide-react';
import { db } from './firebase'; // Make sure this file exports your Firestore `db`
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp
} from 'firebase/firestore';
import './TripPlanner.css'; // Optional styling

function TripPlanner() {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: [],
  });

  // Fetch existing trips on component mount
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripCollection = collection(db, 'trips');
        const tripSnapshot = await getDocs(tripCollection);
        const tripData = tripSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTrips(tripData);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  // Submit new trip
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Submitting new trip:', newTrip);

      const docRef = await addDoc(collection(db, 'trips'), {
        destination: newTrip.destination,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        activities: [],
        createdAt: serverTimestamp()
      });

      console.log('Trip saved with ID:', docRef.id);

      const savedTrip = {
        id: docRef.id,
        ...newTrip
      };

      setTrips(prev => [...prev, savedTrip]);
      setNewTrip({ destination: '', startDate: '', endDate: '', activities: [] });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving trip:', error.message);
      alert('Error creating trip: ' + error.message);
    }
  };
  return (
    <div className="trip-container">
      <div className="trip-card">
        <div className="trip-header">
          <h1 className="trip-title">Trip Planner</h1>
          <button onClick={() => setShowForm(true)} className="new-trip-btn">
            <Plus className="icon" />
            <span>New Trip</span>
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="trip-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Destination</label>
                <div className="form-input-wrapper">
                  <MapPin className="icon gray location" />
                  <input
                    type="text"
                    value={newTrip.destination}
                    placeholder='Where are you going?'
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, destination: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Start Date</label>
                <div className="form-input-wrapper">
                  <Calendar className="icon gray calendar" />
                  <input
                    type="date"
                    value={newTrip.startDate}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, startDate: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">End Date</label>
                <div className="form-input-wrapper">
                  <Clock className="icon gray clock" />
                  <input
                    type="date"
                    value={newTrip.endDate}
                    onChange={(e) =>
                      setNewTrip({ ...newTrip, endDate: e.target.value })
                    }
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                Create Trip
              </button>
            </div>
          </form>
        )}

        <div className="trip-list">
          {trips.length === 0 ? (
            <p>No trips yet. Start by creating one!</p>
          ) : (
            trips.map((trip) => (
              <div key={trip.id} className="trip-item">
                <div className="trip-details">
                  <h3 className="trip-destination">{trip.destination}</h3>
                  <p className="trip-dates">
                    {new Date(trip.startDate).toLocaleDateString()} -{' '}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;
