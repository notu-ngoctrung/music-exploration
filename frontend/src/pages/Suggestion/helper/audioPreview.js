const songPreviewable = (song) => {
  console.log(song);
  return (song['preview_url'] !== null && song['preview_url'].trim() !== '');
};


export { songPreviewable };