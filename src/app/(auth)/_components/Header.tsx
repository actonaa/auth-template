type PropsHeader = {
  title: string;
  messageError?: string;
};

export default function Header({ title, messageError }: PropsHeader) {
  return (
    <>
      <h1 className="text-3xl font-bold mb-3 text-slate-800 dark:text-white">
        {title}
      </h1>
      {messageError && (
        <p className="text-red-500 mb-3 text-center font-bold">
          {messageError}
        </p>
      )}
    </>
  );
}
