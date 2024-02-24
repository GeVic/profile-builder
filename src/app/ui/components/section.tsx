const Section = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col w-3/5 gap-8 self-end">{children}</div>;
};

export default Section;
