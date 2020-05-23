type HelloArgs = {
  subject: string;
};
export default (obj: any, { subject }: HelloArgs): string => {
  return `Hello, ${subject}! from Server`;
};
