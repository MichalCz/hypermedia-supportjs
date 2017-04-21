(() => {
    let toEncrypt = process.argv[2];
    let l = toEncrypt.length;
    let encrypted = "";
    const rotation = 13;

    for (let i = 0; i < l; i++) {
        let rotatedCharCode = toEncrypt.charCodeAt(i) + rotation;
        if (rotatedCharCode > 122) {
        	rotatedCharCode = 96 + (rotatedCharCode - 122);
        }
        encrypted += String.fromCharCode(rotatedCharCode);
    }
    console.log(encrypted);
})();



