export type Error = {
  status: number;
  data: {
    message: string;
    stack: string;
  };
};
