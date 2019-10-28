function addText(game, x, y, content, font, otherGroup) {
  const newText = game.add.text(
    x,
    y,
    content,
    {
      font,
      fill: '#ffffff',
      align: 'center',
    },
    otherGroup
  );

  newText.anchor.setTo(0.5, 0.5);

  return newText;
}

export default addText;
