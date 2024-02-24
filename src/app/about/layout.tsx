const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col md:flex-row justify-between gap-6">
      {children}
    </div>
  );
};

export default CommonLayout;
