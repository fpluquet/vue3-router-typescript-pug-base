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


export function svgProgressBar(percent: number, color: String) {
	return btoa(
		`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 104 16" fill="none" style="&#10;    width: 200px;&#10;">
    <g filter="url(#filter0_i)">
        <rect width="104" height="6" rx="3" fill="#E7E7E7"/>
    </g>
    <rect x="2" y="1" width="${percent}" height="4" rx="2" fill="${color}"/>
    <defs>
        <filter id="filter0_i" x="0" y="0" width="124" height="6" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dx="4"/>
            <feGaussianBlur stdDeviation="3.5"/>
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"/>
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow"/>
        </filter>
    </defs>
</svg>`)
}

