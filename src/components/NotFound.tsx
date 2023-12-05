import SquareColors from './admin/SquareColors';

interface Props {
  message: string;
}

export default function NotFound({ message }: Props) {
  return (
    <div className='overflow-x-hidden'>
      <SquareColors />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
            Ocurrió un Problema
          </p>
          <p className="md:text-lg lg:text-xl text-gray-600 mt-8">{message}</p>
        </div>
      </div>
    </div>
  );
}
