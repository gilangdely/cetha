const NamedSectionResult = ({
  title,
  list,
}: {
  title: string;
  list: string[];
}) => {
  return (
    <>
      <h3 className="text-TextPrimary mt-6 text-lg font-semibold">{title}</h3>
      <ul className="mt-1 list-inside list-disc space-y-1 text-gray-700">
        {list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default NamedSectionResult;
