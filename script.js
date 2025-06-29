const glass = document.getElementById('glass');

// Ask for mic access
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const context = new AudioContext();
    const source = context.createMediaStreamSource(stream);
    const analyser = context.createAnalyser();
    analyser.fftSize = 256;

    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function animate() {
      analyser.getByteFrequencyData(dataArray);
      const volume = dataArray.reduce((a, b) => a + b, 0) / dataArray.length;

      if (volume > 50) {
        glass.classList.add('pulse');
      } else {
        glass.classList.remove('pulse');
      }

      requestAnimationFrame(animate);
    }

    animate();
  })
  .catch(err => {
    console.error('Mic access denied:', err);
  });

