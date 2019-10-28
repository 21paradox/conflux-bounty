function loadScript(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export async function loadPhaser() {
  const PIXI = await import('script-loader!phaser/build/custom/phaser-arcade-physics.js');
  // return loadScript('https://cdn.bootcss.com/phaser/2.6.2/custom/phaser-arcade-physics.js')
}
