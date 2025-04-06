import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plus } from 'lucide-react';
import { db } from './firebase'; // 👈 import your Firebase setup
import { collection, addDoc, getDocs } from 'firebase/firestore';
import './TripPlanner.css';

function TripPlanner() {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: []
  });

  // Fetch trips on load
  useEffect(() => {
    const fetchTrips = async () => {
      const tripCollection = collection(db, 'trips');
      const tripSnapshot = await getDocs(tripCollection);
      const tripData = tripSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTrips(tripData);
    };

    fetchTrips();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tripRef = await addDoc(collection(db, 'trips'), newTrip);
      const savedTrip = { ...newTrip, id: tripRef.id };
      setTrips(prev => [...prev, savedTrip]);
      setNewTrip({ destination: '', startDate: '', endDate: '', activities: [] });
      setShowForm(false);
    } catch (error) {
      console.error('Error saving trip:', error);
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
                  <MapPin className="icon gray" />
                  <input
                    type="text"
                    value={newTrip.destination}
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
                  <Calendar className="icon gray" />
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
                  <Clock className="icon gray" />
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
          {trips.map((trip) => (
            <div key={trip.id} className="trip-item">
              <div className="trip-details">
                <h3 className="trip-destination">{trip.destination}</h3>
                <p className="trip-dates">
                  {new Date(trip.startDate).toLocaleDateString()} -{' '}
                  {new Date(trip.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;
