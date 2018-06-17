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
				googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBN13XZ_q8-6d-P20Hln59RhqWxUgQo5W0&v=3.exp&libraries=geometry,drawing,places"
				loadingElement={<div style={{ height: `100%` }} />}
				containerElement={<div style={{ height: `100%`, width: `100%` }} />}
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
				const avatars = JSON.parse(entry.avatar)
				return (
					<Marker
						position={{ lat, lng }}
						key={id}
						onMouseOver={() => props.onToggleOpen(entry)}
						onMouseOut={() => props.onToggleOpen(entry)}>
						{isOpen && <InfoWindow>
							<React.Fragment >
								<h4>{`City: ${city}`}</h4>
								<div className='container'>
									{
										JSON.parse(user).map((el, i) => {
											return (
												<div className='user-profile'>
													<img className='avatar' src={avatars[i]} height="32" width="32" alt="avatar"/>
													<div className='nickname'>{`${el}`}</div>
												</div>
											)
										})
									}
								</div>
							</React.Fragment>
						</InfoWindow>}
					</Marker>
				)}
			)}
		</GoogleMap>
	)}
))