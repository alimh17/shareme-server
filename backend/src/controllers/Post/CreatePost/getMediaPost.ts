const getMediaPost = (files: any) => {
  const media = [];
  for (const file of files) {
    media.push({
      source: file.path.slice(6, file.path.length),
      title: file.filename,
    });
  }
  return media;
};

export default getMediaPost;
