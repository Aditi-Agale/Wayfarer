import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Plus, Trash2, Edit, CheckCircle, XCircle } from 'lucide-react';
import { db } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp
} from 'firebase/firestore';
import './TripPlanner.css';

function TripPlanner() {
  const [trips, setTrips] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTripId, setCurrentTripId] = useState(null);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: [],
  });
  const [activityInput, setActivityInput] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const tripData = {
        destination: newTrip.destination,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        activities: newTrip.activities,
        createdAt: serverTimestamp(),
      };

      if (editMode) {
        const tripRef = doc(db, 'trips', currentTripId);
        await updateDoc(tripRef, tripData);
        const updatedTrips = trips.map(trip =>
          trip.id === currentTripId ? { ...trip, ...tripData } : trip
        );
        setTrips(updatedTrips);
      } else {
        const docRef = await addDoc(collection(db, 'trips'), tripData);
        setTrips(prev => [...prev, { id: docRef.id, ...tripData }]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Error creating trip: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const tripRef = doc(db, 'trips', id);
      await deleteDoc(tripRef);
      setTrips(trips.filter(trip => trip.id !== id));
    } catch (error) {
      console.error('Error deleting trip:', error);
      alert('Error deleting trip: ' + error.message);
    }
  };

  const handleEdit = (trip) => {
    setEditMode(true);
    setCurrentTripId(trip.id);
    setNewTrip({
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      activities: trip.activities,
    });
    setShowForm(true);
  };

  const handleActivityAdd = () => {
    if (activityInput) {
      setNewTrip({
        ...newTrip,
        activities: [...newTrip.activities, activityInput],
      });
      setActivityInput('');
    }
  };

  const handleActivityDelete = (index) => {
    const updatedActivities = newTrip.activities.filter((_, i) => i !== index);
    setNewTrip({ ...newTrip, activities: updatedActivities });
  };

  const resetForm = () => {
    setNewTrip({ destination: '', startDate: '', endDate: '', activities: [] });
    setActivityInput('');
    setEditMode(false);
    setShowForm(false);
  };

  const handleViewTrip = (trip) => {
    alert(`Destination: ${trip.destination}\nActivities: ${trip.activities.join(', ')}`);
  };

  const handleSortTrips = () => {
    const sortedTrips = [...trips].sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
    setTrips(sortedTrips);
  };

  const handleFilterTrips = (filter) => {
    const filteredTrips = trips.filter(trip => trip.destination.toLowerCase().includes(filter.toLowerCase()));
    setTrips(filteredTrips);
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

        <div className="trip-actions">
          <button onClick={handleSortTrips} className="sort-btn">
            Sort by Date
          </button>
          <input
            type="text"
            placeholder="Search by destination"
            onChange={(e) => handleFilterTrips(e.target.value)}
            className="search-input"
          />
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
                    placeholder="Where are you going?"
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

            <div className="form-group">
              <label className="form-label">Activities</label>
              <div className="form-input-wrapper">
                <input
                  type="text"
                  value={activityInput}
                  onChange={(e) => setActivityInput(e.target.value)}
                  placeholder="Add an activity"
                  className="form-input"
                />
                <button type="button" onClick={handleActivityAdd} className="add-activity-btn">
                  <Plus className="icon" />
                </button>
              </div>
              <ul className="activities-list">
                {newTrip.activities.map((activity, index) => (
                  <li key={index} className="activity-item">
                    {activity}
                    <button type="button" onClick={() => handleActivityDelete(index)} className="delete-activity-btn">
                      <XCircle className="icon" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {editMode ? 'Update Trip' : 'Create Trip'}
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
                <div className="trip-details" onClick={() => handleViewTrip(trip)}>
                  <h3 className="trip-destination">{trip.destination}</h3>
                  <p className="trip-dates">
                    {new Date(trip.startDate).toLocaleDateString()} -{' '}
                    {new Date(trip.endDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="trip-actions">
                  <button onClick={() => handleEdit(trip)} className="edit-btn">
                    <Edit className="icon" />
                  </button>
                  <button onClick={() => handleDelete(trip.id)} className="delete-btn">
                    <Trash2 className="icon" />
                  </button>
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
