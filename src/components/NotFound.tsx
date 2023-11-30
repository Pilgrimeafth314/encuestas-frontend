interface Props {
  message: string;
}

export default function NotFound({ message }: Props) {
  return (
    <div className="grid items-center">
      <h1 className="text-xl">404</h1>
      <h3 className="text-md">{message}</h3>
    </div>
  );
}
