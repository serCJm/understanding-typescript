import axios from "axios";

const form = document.querySelector("form")!;
const addressInput = document.querySelector("#address")! as HTMLInputElement;

type GoogleMapAPIResponse = {
	results: { geometry: { location: { lat: number; lng: number } } }[];
	status: "OK" | "ZERO RESULTS";
};
// declare var google: any;

function searchAddressHandler(event: Event) {
	event.preventDefault();
	const enteredAddress = addressInput.value;

	// send to Google API
	axios
		.get<GoogleMapAPIResponse>(
			`google-maps-api=${encodeURI(enteredAddress)}&key=GOOGLE`
		)
		.then((res) => {
			if (res.data.status !== "OK") throw new Error("Something went wrong");
			const coordinates = res.data.results[0].geometry.location;
			const map = new google.maps.Map(
				document.getElementById("map") as HTMLDivElement,
				{
					center: coordinates,
					zoom: 16,
				}
			);
			new google.maps.Marker({ position: coordinates, map: map });
		})
		.catch((err) => {
			alert(err.message);
			console.log(err);
		});
}

form.addEventListener("submit", searchAddressHandler);
