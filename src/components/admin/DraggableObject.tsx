export function DraggableObject() {
  const handleDragStart = (e: {
    dataTransfer: { setData: (arg0: string, arg1: string) => void };
  }) => {
    e.dataTransfer.setData('text/plain', 'draggable-object');
  };

  return (
    <div
      className="transition-al flex flex-col items-center w-56 h-auto bg-blue-500 p-4 m-2 cursor-pointer  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg animate-pulse text-center shadow-lg"
      draggable
      onDragStart={handleDragStart}
    >
      <i className="ri-questionnaire-line text-4xl mb-2"></i>
      <span className="text-lg">Bloque de pregunta</span>
    </div>
  );
}
