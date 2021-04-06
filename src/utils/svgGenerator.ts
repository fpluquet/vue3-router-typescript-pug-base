function toPrecisionFloat(ff: number, precision: number) {
	const pp = 10 ** precision;
	return Math.round(ff * pp) / pp;
}
function percentToRads(percentIn: number) {
	if (percentIn === 0) {
		return 0;
	}
	if (percentIn === 100) {
		return 2 * Math.PI;
	}
	return percentIn * (2 / 100) * Math.PI;
}

export function svgOfArc(percent: number) {
	let path;
	if (40 >= 100) {
		path = '<circle mask="url(#maskCircle)" cx="0" cy="0" r="1" stroke="black" fill="#6AC24B" stroke-width="0" transform="scale(1,-1) rotate(-90 0 0)" />';
	} else {
		const arcY = toPrecisionFloat(Math.sin(percentToRads(percent)), 3)
		const arcX = toPrecisionFloat(Math.cos(percentToRads(percent)), 3)
		const isMayorArc = percent > 50;
		path = `<path d="M 0 0 L 1 0 A 1 1 0 ${isMayorArc ? 1 : 0} 1 ${arcX} ${arcY} L 0 0" stroke="black" fill="#6AC24B" stroke-width="0" transform="scale(1,-1) rotate(-90 0 0)" mask="url(#maskCircle)" />`;
	}
	return btoa(`<svg width="456" height="456" viewBox="-1.2 -1.2 2.4 2.4" fill="none" xmlns="http://www.w3.org/2000/svg">
	<mask id="maskCircle">
	  <rect width="2.4" height="2.4" x="-1.2" y="-1.2" fill="white"/>
	  <circle cx="0" cy = "0" r = "0.8" fill = "black" />
	  </mask>
	  <circle mask="url(#maskCircle)" cx="0" cy="0" r="1" fill="#C4C4C4" />
	  ${path}
  </svg>`);
}


// export function svgOfArcGlobal(percent: number) {
// 	const arcY = toPrecisionFloat(Math.sin(percentToRads(percent)), 3)
// 	const arcX = toPrecisionFloat(Math.cos(percentToRads(percent)), 3)
// 	const isMayorArc = percent > 50;

// 	return btoa(`<svg width="456" height="456" viewBox="-1.2 -1.2 2.5 2.5" fill="none" xmlns="http://www.w3.org/2000/svg">
// 		<mask id="maskCircle">
// 			<rect width="2.5" height="2.5" x="-1.2" y="-1.2" fill="white"/>
// 			<circle cx="0" cy = "0" r = "0.89" fill = "black" />
// 			</mask>
// 			<circle mask="url(#maskCircle)" cx="0" cy="0" r="1" fill="#C4C4C4" />

// 		<path d="M 0 0 L 1 0 A 1 1 0 ${isMayorArc ? 1 : 0} 1 ${arcX} ${arcY} L 0 0" stroke="black" fill="#6AC24B" stroke-width="0" transform="scale(1,-1) rotate(-90 0 0)" mask="url(#maskCircle)" />
// 	</svg>`);
// }

