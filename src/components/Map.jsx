import React from 'react';
import { withScriptjs, GoogleMap, Marker, withGoogleMap, InfoWindow } from "react-google-maps";

export default class Map extends React.Component {
	componentDidMount() {
		this.props.fetchLocations();
	}

	handleMarkerClick = entry => {
		this.props.toggleIsOpen(entry);
  }

	render() {
		return (
			<GoogleMapComponent
				onToggleOpen={this.handleMarkerClick}
				locations = {this.props.locations.locations}
				isMarkerShown
				googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `600px` }} />}
				mapElement={<div style={{ height: `100%` }} />}
			/>
		)
	}
}

const GoogleMapComponent = withScriptjs(withGoogleMap((props) => {
	return (
		<GoogleMap
			defaultZoom={2}
			defaultCenter={{ lat: 32.818, lng: 22.602 }}
		>
			{ props.locations.map(entry => {
				const { lat, lng, isOpen, city, user, id } = entry;
				return (
					<Marker
						position={{ lat, lng }}
						key={id}
						onMouseOver={() => props.onToggleOpen(entry)}
						onMouseOut={() => props.onToggleOpen(entry)}> 
						{isOpen && <InfoWindow>
							<div>
								{`city: ${city}, user: ${user}`}
							</div>
						</InfoWindow>}
					</Marker> 
				)} 
			)}
		</GoogleMap>
	)}
))