import SquareColors from './admin/SquareColors';

export function OnSuccess() {
  return (
    <div className="overflow-x-hidden">
      <SquareColors />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <div className="bg-green-500 p-5 rounded-md shadow-xl shadow-green-400">
            <p className="text-3xl md:text-4xl lg:text-5xl text-white mt-12">
              Has contestado la encuesta satisfactoriamente
            </p>
            <p className="md:text-md lg:text-lg text-white mt-8">
              ¡Gracias por participar!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
