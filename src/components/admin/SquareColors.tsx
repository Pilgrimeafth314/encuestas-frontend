import React, { useEffect, useState } from 'react';

const calcularColumnas = () => {
  const anchoPantalla = window.innerWidth;
  if (anchoPantalla >= 1200) {
    return 60;
  } else if (anchoPantalla >= 768) {
    return 35;
  } else {
    return 15;
  }
};

interface Elemento {
  color: string;
  icono: string;
}

const elmes: Elemento[] = [
  { color: 'bg-yellow-500', icono: 'ri-circle-line' },
  { color: 'bg-blue-500', icono: 'ri-cloud-line' },
  { color: 'bg-blue-900', icono: 'ri-square-fill' },
  { color: 'bg-green-500', icono: 'ri-code-s-slash-line' },
  { color: 'bg-red-500', icono: 'ri-arrow-left-down-line' },
  { color: 'bg-blue-500', icono: 'ri-circle-line' },
  { color: 'bg-blue-900', icono: 'ri-square-fill' },
  { color: 'bg-pink-500', icono: 'ri-microscope-line' },
];

const SquareColors = () => {
  const [elementos, setElementos] = useState<Elemento[]>([]);

  const actualizarColumnas = () => {
    const nuevasColumnas = calcularColumnas();
    const nuevosElementos = [];
    let realIndex = 0;
    for (let i = 0; i < nuevasColumnas; i++) {
      if (realIndex > elmes.length - 1) realIndex = 0;

      nuevosElementos.push(elmes[realIndex++]);
    }

    setElementos(nuevosElementos.flat());
  };

  useEffect(() => {
    // Llama a la función al inicio para establecer la cantidad inicial de columnas
    actualizarColumnas();

    const manejarResize = () => {
      // Llama a la función en el evento de cambio de tamaño de la ventana
      actualizarColumnas();
    };

    window.addEventListener('resize', manejarResize);

    return () => {
      window.removeEventListener('resize', manejarResize);
    };
  }, []);

  return (
    <div className="flex">
      {elementos.map((elemento, index) => (
        <div
          key={index}
          className={`flex items-center w-full sm:w-${12 / calcularColumnas()}`}
        >
          <div className={`p-2 flex items-center ${elemento.color} text-white`}>
            <i className={`${elemento.icono} text-4xl`}></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SquareColors;
