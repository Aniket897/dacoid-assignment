export const formatUrlList = (urls: any[]) => {
  return urls.map((url) => {
    return {
      ...url,
      id: url._id,
    };
  });
};

export const formatUrl = (url: any) => {
  return {
    ...url,
    id: url._id,
  };
};
