export type Item = {
  id: string;
  content: string;
};

export type Column = {
  name: string;
  items: Item[];
};
