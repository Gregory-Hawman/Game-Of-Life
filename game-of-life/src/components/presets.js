import { universalRows, universalColumns} from './game';

export const presetLine = () => {
	const grid = [];
	for (let r = 0; r < universalRows; r++) {
		grid[r] = [];
        if (r === Math.floor(universalRows/2)) {
            for (let c = 0; c < universalColumns; c++) {
                grid[r][c] = true;
            }
        } else {
            for (let c = 0; c < universalColumns; c++) {
                grid[r][c] = false;
            }
        }
	}
	return grid;
};

export const lineSegmentsPreset = () => {
	const grid = [];
	for (let r = 0; r < universalRows; r++) {
		grid[r] = [];
        if (r === Math.floor(universalRows/2)) {
            for (let c = 0; c < universalColumns; c++) {
                if (c === 57 || c === 58 || c === 59 || c === 60 || c === 61 || c === 62 || c === 63 || c === 64 || c === 66 || c === 67 || c === 68 || c === 69 || c === 70 || c === 74 || c === 75 || c === 76 || c === 83 || c === 84 || c === 85 || c === 86 || c === 87 || c === 88 || c === 89 || c === 91 || c === 92 || c === 93 || c === 94 || c === 95) {
                    grid[r][c] = true;
                } else {
                    grid[r][c] = false;
                }
            }
        } else {
            for (let c = 0; c < universalColumns; c++) {
                grid[r][c] = false;
            }
        } 
    }
    return grid;
}

export const gosperGliderGunPreset = () => {
    const grid = [];
    for (let r = 0; r < universalRows; r++) {
	    grid[r] = [];
            for (let c = 0; c < universalColumns; c++) {
                if (r=== 46){
                    if(c === 74){
                        grid[r][c] = true;
                    }
                } else if (r===47){
                    if(c === 72 || c === 74) {
                        grid[r][c] = true;
                    }
                } else if (r===48){
                    if(c === 62 || c ===  63 || c ===  70 || c ===  71 || c ===  84 || c ===  85) {
                        grid[r][c] = true;
                    }
                } else if (r===49){
                    if(c === 61 || c ===  65 || c ===  70 || c ===  71 || c ===  84 || c ===  85) {
                        grid[r][c] = true;
                    }
                } else if (r===50){
                    if(c === 50 || c ===  51 || c === 60 || c === 66 || c === 70 || c === 71) {
                        grid[r][c] = true;
                    }
                } else if (r===51){
                    if(c === 50 || c === 51 || c === 60 || c === 64 || c === 66 || c === 67 || c === 72 || c === 74) {
                        grid[r][c] = true;
                    }
                } else if (r===52){
                    if(c === 60 || c === 66 || c === 74) {
                        grid[r][c] = true;
                    }
                } else if (r===53){
                    if(c === 61 || c === 65) {
                        grid[r][c] = true;
                    }
                } else if (r===54){
                    if(c === 62 || c === 63) {
                        grid[r][c] = true;
                    }
                } else {
                    grid[r][c] = false;
                } 
            }
    }
    return grid;
}

export const pulsarPreset = () => {
    const grid = [];
    for (let r = 0; r < universalRows; r++) {
	    grid[r] = [];
            for (let c = 0; c < universalColumns; c++) {
                if (r=== 69){
                    if(c === 71 || c ===  72 || c ===  73 || c ===  77 || c ===  78 || c ===  79) {
                        grid[r][c] = true;
                    }
                } else if (r===71){
                    if(c === 69 || c ===  74 || c ===  76 || c ===  81) {
                        grid[r][c] = true;
                    }
                } else if (r===72){
                    if(c === 69 || c ===  74 || c ===  76 || c ===  81) {
                        grid[r][c] = true;
                    }
                } else if (r===73){
                    if(c === 69 || c ===  74 || c ===  76 || c ===  81) {
                        grid[r][c] = true;
                    }
                } else if (r===74){
                    if(c === 71 || c ===  72 || c ===  73 || c ===  77 || c ===  78 || c ===  79) {
                        grid[r][c] = true;
                    }
                } else if (r===76){
                    if(c === 71 || c ===  72 || c ===  73 || c ===  77 || c ===  78 || c ===  79) {
                        grid[r][c] = true;
                    }
                } else if (r===77){
                    if(c === 69 || c ===  74 || c ===  76 || c ===  81) {
                        grid[r][c] = true;
                    }
                } else if (r===78){
                    if(c === 69 || c ===  74 || c ===  76 || c ===  81) {
                        grid[r][c] = true;
                    }
                } else if (r===79){
                    if(c === 69 || c ===  74 || c ===  76 || c ===  81) {
                        grid[r][c] = true;
                    }
                } else if (r===81){
                    if(c === 71 || c ===  72 || c ===  73 || c ===  77 || c ===  78 || c ===  79) {
                        grid[r][c] = true;
                    }
                } else {
                    grid[r][c] = false;
                } 
            }
    }
    return grid;
}

export const simkinGliderGunPreset = () => {
    const grid = [];
    for (let r = 0; r < universalRows; r++) {
	    grid[r] = [];
            for (let c = 0; c < universalColumns; c++) {
                if (r === 81){
                    if(c === 73 || c ===  74 || c === 80 || c === 81){
                        grid[r][c] = true;
                    }
                } else if (r === 82){
                    if(c === 73 || c === 74 || c === 80 || c === 81) {
                        grid[r][c] = true;
                    }
                } else if (r === 84){
                    if(c === 77 || c ===  78) {
                        grid[r][c] = true;
                    }
                } else if (r === 85){
                    if(c === 77 || c ===  78) {
                        grid[r][c] = true;
                    }
                } else if (r === 90){
                    if(c === 95 || c === 96 || c === 98 || c === 99) {
                        grid[r][c] = true;
                    }
                } else if (r === 91){
                    if(c === 94 || c === 100 ) {
                        grid[r][c] = true;
                    }
                } else if (r === 92){
                    if(c === 94 || c === 101 || c === 105 || c === 104) {
                        grid[r][c] = true;
                    }
                } else if (r === 93){
                    if(c === 94 || c === 95 || c === 96 || c === 100 || c === 104 || c === 105) {
                        grid[r][c] = true;
                    }
                } else if (r === 94){
                    if(c === 99 ) {
                        grid[r][c] = true;
                    }
                } else if (r === 99){
                    if(c === 97 || c === 99 || c === 100) {
                        grid[r][c] = true;
                    }
                } else if (r === 100){
                    if(c === 97 || c === 98 || c === 100) {
                        grid[r][c] = true;
                    }
                } else {
                    grid[r][c] = false;
                } 
            }
    }
    return grid;
}

export const honeycombPreset = () => {
    const grid = [];
    for (let r = 0; r < universalRows; r++) {
	    grid[r] = [];
            for (let c = 0; c < universalColumns; c++) {
                if (r === 71 || r === 79){
                    if(c === 74 || c ===  75 || c === 76 || c === 77){
                        grid[r][c] = true;
                    }
                } else if (r === 73 || r === 77){
                    if(c === 72 || c === 73 || c === 74 || c === 75 || c === 76 || c === 77 || c === 78 || c === 79) {
                        grid[r][c] = true;
                    }
                } else if (r === 75){
                    if(c === 70 || c ===  71 || c ===  72 || c ===  73 || c ===  74 || c ===  75 || c ===  76 || c ===  77 || c ===  78 || c ===  79 || c ===  80 || c ===  81) {
                        grid[r][c] = true;
                    }
                } else {
                    grid[r][c] = false;
                } 
            }
    }
    return grid;
}



// const gosperGliderGunArray = [
//     [46, 74],
//     [47, 72], [47, 74],
//     [48, 62], [48, 63], [48, 70], [48, 71], [48, 84], [48, 85],
//     [49, 61], [49, 65], [49, 70], [49, 71], [49, 84], [49, 85],
//     [50, 50], [50, 51], [50, 60], [50, 66], [50, 70], [50, 71],
//     [51, 50], [51, 51], [51, 60], [51, 64], [51, 66], [51, 67], [51, 72], [51, 74],
//     [52, 60], [52, 66], [52, 74],
//     [53, 61], [53, 65],
//     [54, 62], [54, 63]
// ]


// const pulsarArray = [
//     [69, 71], [69, 72], [69, 73], [69, 77], [69, 78], [69, 79],
//     [71, 69], [71, 74], [71, 76], [71, 81], 
//     [72, 69], [72, 74], [72, 76], [72, 81],
//     [73, 69], [73, 74], [73, 76], [73, 81],
//     [74, 71], [74, 72], [74, 73], [74, 77], [74, 78], [74, 79],
//     [76, 71], [76, 72], [76, 73], [76, 77], [76, 78], [76, 79],
//     [77, 69], [77, 74], [77, 76], [77, 81], 
//     [78, 69], [78, 74], [78, 76], [78, 81],
//     [79, 69], [79, 74], [79, 76], [79, 81],
//     [81, 71], [81, 72], [81, 73], [81, 77], [81, 78], [81, 79],
// ]

// const lineSegmentsPresets = [
//     57 58 59 60 61 62 63 64  66 67 68 69 70  74 75 76  83 84 85 86 87 88 89 91 92 93 94 95
// ]


// const simkinGliderGunArray = [
//     [81,73],[81,74],[81,80],[81,81],
//     [82,73],[82,74],[82,80],[82,81],
//     [84,77],[84,78],
//     [85,77],[85,78],
//     [90,95],[90,96],[90,98],[90,99],
//     [91,94],[91,100],
//     [92,94],[92,101],[92,105],[92,104],
//     [93,94],[93,95],[93,96],[93,100],[93,104],[93,105],
//     [94,99],
//     [99,97],[99,99],[99,100],
//     [100,97],[100,98],[100,100],
// ]

// const honeycombArray = [
//     [71,74], [71,75], [71, 76], [71,77]
//     [73,72], [73,73], [73,74], [73,75], [73,76], [73,77], [73,78], [73,79],
//     [75,70], [75,71], [75,72], [75,73], [75,74], [75,75], [75,76], [75,77], [75,78], [75,79], [75,80], [75,81], 
//     [77,72], [77,73], [77,74], [77,75], [77,76], [77,77], [77,78], [77,79], 
//     [79,74], [79,75], [79,76], [79,77], 
// ] 


// given an array (full of 2 point arrays ie [5, 17]) and our grid, a much bigger "empty" array
// loop through given array adding all array[0] to an {} and the key and then array[1] will be the values and will be stored as an array of values,


// let arr = gosperGliderGunArray
// const testFunction = (arr) => {
//     let cache = {}
//     for (let i = 0; i < arr.length; i++) {
//         // is arr[i][0] in cache

        
//     }
// }

// console.log(testFunction(arr))