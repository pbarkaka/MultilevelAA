import React, { useState } from 'react';
import { Text, Button } from '@momentum-design/components/react';
import Modal from '../common/Modal';
import './LocationModal.css';

interface LocationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (locationData: LocationData) => void;
}

export interface LocationData {
    name: string;
    country: string;
    address: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    timezone: string;
    emailLanguage: string;
}

const LocationModal: React.FC<LocationModalProps> = ({ isOpen, onClose, onSave }) => {
    const [formData, setFormData] = useState<LocationData>({
        name: '',
        country: '',
        address: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: '',
        latitude: 0,
        longitude: 0,
        timezone: '',
        emailLanguage: 'English – American English'
    });

    const [mapView, setMapView] = useState<'map' | 'satellite'>('map');

    const handleChange = (field: keyof LocationData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
        // Reset form
        setFormData({
            name: '',
            country: '',
            address: '',
            addressLine2: '',
            city: '',
            state: '',
            zipCode: '',
            latitude: 0,
            longitude: 0,
            timezone: '',
            emailLanguage: 'English – American English'
        });
    };

    const handleCancel = () => {
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create a location" size="large">
            <div className="location-modal-layout">
                <div className="location-form">
                    <div className="form-group">
                        <label htmlFor="locationName">
                            Location name <span className="required">*</span>
                        </label>
                        <input
                            id="locationName"
                            type="text"
                            placeholder="Enter a location name"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">
                            Country / Region <span className="required">*</span>
                        </label>
                        <select
                            id="country"
                            value={formData.country}
                            onChange={(e) => handleChange('country', e.target.value)}
                            className="form-select"
                        >
                            <option value="">Select a country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="GB">United Kingdom</option>
                            <option value="AU">Australia</option>
                            <option value="IN">India</option>
                            <option value="DE">Germany</option>
                            <option value="FR">France</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">
                            Address <span className="required">*</span>
                        </label>
                        <div className="search-input-wrapper">
                            <span className="search-icon">🔍</span>
                            <input
                                id="address"
                                type="text"
                                placeholder="Search address"
                                value={formData.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                className="form-input search-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Address line 2 (optional)"
                            value={formData.addressLine2}
                            onChange={(e) => handleChange('addressLine2', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="city">City / Town</label>
                        <input
                            id="city"
                            type="text"
                            placeholder="Enter the city / town"
                            value={formData.city}
                            onChange={(e) => handleChange('city', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state">State / Province / Region</label>
                        <input
                            id="state"
                            type="text"
                            placeholder="Enter a state / province / region"
                            value={formData.state}
                            onChange={(e) => handleChange('state', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="zipCode">ZIP / Postal Code</label>
                        <input
                            id="zipCode"
                            type="text"
                            placeholder="Enter the ZIP / postal code"
                            value={formData.zipCode}
                            onChange={(e) => handleChange('zipCode', e.target.value)}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <div className="coordinates">
                            <Text type="body-small-medium">
                                Latitude: {formData.latitude}
                            </Text>
                            <Text type="body-small-medium" className="longitude">
                                Longitude: {formData.longitude}
                            </Text>
                            <button className="edit-link">Edit</button>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="timezone">Timezone</label>
                        <select
                            id="timezone"
                            value={formData.timezone}
                            onChange={(e) => handleChange('timezone', e.target.value)}
                            className="form-select"
                        >
                            <option value="">Select a timezone</option>
                            <option value="America/New_York">Eastern Time (US & Canada)</option>
                            <option value="America/Chicago">Central Time (US & Canada)</option>
                            <option value="America/Denver">Mountain Time (US & Canada)</option>
                            <option value="America/Los_Angeles">Pacific Time (US & Canada)</option>
                            <option value="Europe/London">London</option>
                            <option value="Asia/Kolkata">India Standard Time</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="emailLanguage">
                            Email language <span className="info-icon">ℹ️</span>
                        </label>
                        <select
                            id="emailLanguage"
                            value={formData.emailLanguage}
                            onChange={(e) => handleChange('emailLanguage', e.target.value)}
                            className="form-select"
                        >
                            <option value="English – American English">English – American English</option>
                            <option value="English – British English">English – British English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                        </select>
                    </div>
                </div>

                <div className="location-map">
                    <div className="map-controls">
                        <button 
                            className={`map-control-btn ${mapView === 'map' ? 'active' : ''}`}
                            onClick={() => setMapView('map')}
                        >
                            Map
                        </button>
                        <button 
                            className={`map-control-btn ${mapView === 'satellite' ? 'active' : ''}`}
                            onClick={() => setMapView('satellite')}
                        >
                            Satellite
                        </button>
                    </div>
                    <div className="map-container">
                        <div className="map-placeholder">
                            <div className="map-pin">📍</div>
                            <Text type="body-small-medium" className="map-hint">
                                Drag pin to the center of the location. Dragging the pin will update 
                                the latitude/longitude and the address if a match is found.
                            </Text>
                            <div className="map-warning">
                                <Text type="body-small-regular">
                                    ⚠️ To show the exact latitude and longitude, enter your address 
                                    and select from the dropdown. The suggested address will update 
                                    the pin for accuracy.
                                </Text>
                            </div>
                        </div>
                        <div className="map-attribution">
                            Keyboard shortcuts   Map data ©2024   Terms
                        </div>
                    </div>
                    <div className="map-zoom-controls">
                        <button className="zoom-btn">+</button>
                        <button className="zoom-btn">−</button>
                    </div>
                </div>
            </div>

            <div className="modal-footer">
                <Button variant="secondary" onClick={handleCancel}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Create
                </Button>
            </div>
        </Modal>
    );
};

export default LocationModal;

