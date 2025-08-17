export const limit = 12;

export const delay = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
